import { useEffect, useRef, useState } from "react";
import "../flappy/Flappy.css"

const _grav: number = 10
const _interval: number = 30

let _started: boolean = false
let _globalBallY: number = 0
let _globalBlockX: number = 0
let _globalBlockY: number = 0
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

    const [gravity, setGravity] = useState<number>(0) 
    const [gameSize, setGameSize] = useState<number>(300) 
    
    const ballCollision = gameSize / 6;
    const ballSize = ballCollision / 2;
    const blockSize = gameSize / 10;
  
    useEffect(() => {
            restart();
            tick();
        },
    [])

    function tick(){
        if(!_started){
            gameScale();
            console.log("INTERVAL SET")
            _intervalFunc = setInterval(mainGame, _interval)
            _started = true
        }
    }

    function gameScale(){
        const hght = screen.availHeight / 2
        const scrHeight = Math.floor(hght / 100)
        console.log(hght)
        setGravity(scrHeight * 1.5);
        setGameSize(scrHeight * 100);
    }

    function ballGravity(){
        _globalBallY += gravity
        setBallY(_globalBallY)
    }

    function ballJump(){
        _globalBallY -= gravity * 2
        setBallY(_globalBallY)
        if(_jumpRepeat >= 8){
            _isJumping = false
            _jumpRepeat = 0
        }
        _jumpRepeat++   
    }

    function blockMove(){
        _globalBlockX -= gravity * 0.5
        resetBlock()
        setBlockX(_globalBlockX)
    }

    function rndBlockY(){
        return Math.floor(Math.random() * (gameSize - blockSize))
    }

    function resetBlock(){
        const tempWidth = boxRef?.current?.clientWidth
        if(tempWidth != undefined && _globalBlockX < 0){
            _globalBlockX = gameSize - blockSize
            setBlockX(_globalBlockX)
            _globalBlockY = rndBlockY()
            setBlockY(_globalBlockY)

        }
    }

    function gameOver(){
        if (_intervalFunc){
            console.log("GAME OVER")
            // console.log(_globalBallY)
            // console.log(_globalBlockX)
            // console.log(_globalBlockY)
            setGameEnd(true)
            clearInterval(_intervalFunc)
        }
    }

    function blockCollision(){
        if(_globalBlockX < ballCollision){
            if(_globalBallY > _globalBlockY ){
                //ball is under cube
                if(_globalBallY < _globalBlockY + blockSize){
                    gameOver()
                }
            }else{
                //ball is over cube
                if(_globalBallY > _globalBlockY - blockSize){
                    gameOver()
                }
            }
        }
    }

    function wallCollision(){
        const tempheight = boxRef?.current?.clientHeight
        if(tempheight != undefined && _globalBallY >= tempheight - ballCollision || _globalBallY < 0){
            gameOver()
        }
    }

    function mainGame(){
        if(_isJumping){
            ballJump()
        }else{
            ballGravity()
        }
        blockMove()
        blockCollision()
        wallCollision()
        _runCount++
    }

    function restart(){
        _started = false
        _globalBallY = 0
        _runCount = 0
        _isJumping = false
        _jumpRepeat = 0
        _globalBlockX = gameSize - blockSize
        setGameEnd(false)
        clearInterval(_intervalFunc)
        tick()
    }

    function handleClick(event: React.MouseEvent){
        event.preventDefault()
        _isJumping = true
    }

    function boundingBox() {
        return (
        <div 
            className='flappy-box'
            style={{width: gameSize, height: gameSize}} 
            ref={boxRef} 
            onClick={(e) => handleClick(e)}
        >
            <div style={{position: "absolute", width: gameSize, height: gameSize, zIndex: 11}}>
                <svg width={ballCollision} height={ballCollision} transform={`translate(20, ${ballY})`}>
                    <circle cx={ballSize} cy={ballSize} r={ballSize - 2} stroke="grey" strokeWidth="4" fill="#1a1a1a" />
                </svg>
            </div>
            <div style={{position: "absolute", width: blockSize, height: gameSize, zIndex: 12}}>
                <svg width={blockSize} height={blockSize} transform={`translate(${blockX}, ${blockY})`}>
                    <rect width={blockSize} height={blockSize} rx={15} stroke="grey" strokeWidth="4" fill="#480607"/>
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
            <button className="btn-reset" onClick={() => restart()}>START</button>
        </div>
    )
}

export default Flappy