import { useEffect, useRef, useState } from "react";
import "../flappy/Flappy.css"

const _grav: number = 10
const _interval: number = 30

let _started: boolean = false
let _globalBallY: number = 70
let _globalBlockX: number = 250
let _globalBlockY: number = 400
let _runCount: number = 0
let _intervalFunc: any = null
let _isJumping: boolean = false
let _jumpRepeat: number = 0

function Flappy(){
    const boxRef = useRef<HTMLDivElement | null>(null);
    const flappyRef = useRef<HTMLDivElement | null>(null);
    const [ballY, setBallY] = useState<number>(_globalBallY)
    const [blockX, setBlockX] = useState<number>(_globalBlockX)
    const [blockY, setBlockY] = useState<number>(_globalBlockY)
    const [gameEnd, setGameEnd] = useState<boolean>(false)
    
    useEffect(() => {
            tick()
        },
    [])

    function tick(){
        // console.log(_runCount)
        if(!_started){
            console.log("INTERVAL SET")
            _intervalFunc = setInterval(mainGame, _interval)
            _started = true
        }
    }

    function ballGravity(){
        _globalBallY += _grav
        setBallY(_globalBallY)
    }

    function ballJump(){
        _globalBallY -= _grav * 2
        setBallY(_globalBallY)
        if(_jumpRepeat >= 8){
            _isJumping = false
            _jumpRepeat = 0
        }
        _jumpRepeat++   
    }

    function blockMove(){
        _globalBlockX -= _grav * 0.5
        resetBlock()
        setBlockX(_globalBlockX)
    }

    function rndBlockY(){
        return Math.floor(Math.random() * 500)
    }

    function resetBlock(){
        const tempWidth = boxRef?.current?.clientWidth
        if(tempWidth != undefined && _globalBlockX < 0){
            // gameOver()
            _globalBlockX = 500
            setBlockX(_globalBlockX)
            _globalBlockY = rndBlockY()
            setBlockY(_globalBlockY)

        }
    }

    function gameOver(){
        if (_intervalFunc){
            console.log("GAME OVER")
            setGameEnd(true)
            clearInterval(_intervalFunc)
        }
    }

    function blockCollision(){
        if(_globalBlockX < 90){
            if(_globalBallY > _globalBlockY ){
                //ball is under cube
                if(_globalBallY < _globalBlockY + 90){
                    gameOver()
                }
            }else{
                //ball is over cube
                if(_globalBallY > _globalBlockY - 80){
                    gameOver()
                }
            }
        }
    }

    function wallCollision(){
        const tempheight = boxRef?.current?.clientHeight
        if(tempheight != undefined && _globalBallY >= tempheight - 80 || _globalBallY < 0){
            gameOver()
        }
    }

    function mainGame(){
        blockMove()
        if(_isJumping){
            ballJump()
        }else{
            ballGravity()
        }
        wallCollision()
        blockCollision()
        _runCount++
    }

    function restart(){
        _started = false
        _globalBallY = 0
        _runCount = 0
        _isJumping = false
        _jumpRepeat = 0
        _globalBlockX = 500
        setGameEnd(false)
        clearInterval(_intervalFunc)
        tick()
    }

    function handleClick(event: React.MouseEvent){
        console.log("CLOIKNB")
        event.preventDefault()
        _isJumping = true
    }

    function boundingBox() {
        return (
        <div className='flappy-box' ref={boxRef} onClick={(e) => handleClick(e)}>
            <div style={{position: "absolute", width: "600px", height: "600px", zIndex: 11}}>
                <svg width={"80px"} height={"80px"} transform={`translate(20, ${ballY})`}>
                    <circle cx="40px" cy="40px" r="38px" stroke="grey" strokeWidth="4" fill="#1a1a1a" />
                </svg>
            </div>
            <div style={{position: "absolute", width: "100px", height: "600px", zIndex: 12}}>
                <svg width={100} height={100} transform={`translate(${blockX}, ${blockY})`}>
                    <rect width={100} height={100} rx={15} stroke="grey" strokeWidth="4" fill="#480607"/>
                </svg>
            </div>
        </div>
        )
    }

    return (
        <div ref={flappyRef} className='flappygame' style={{width: "80vw", height: "100%"}}>
            {gameEnd ? (
                <div className='flappy-gameover'>
                    <h2 style={{fontSize: "4rem"}}>GAME OVER</h2>
                </div>
            ) : (<></>)}
            <h1>FLAPPYBOLL</h1>
            {boundingBox()}
            <button className="btn-reset" onClick={() => restart()}>RESTART</button>
        </div>
    )
}

export default Flappy