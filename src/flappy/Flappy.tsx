import { useEffect, useRef, useState } from "react";
import "../flappy/Flappy.css"

const _grav: number = 10
const _interval: number = 30

let _started: boolean = false
let _globalBallY: number = 0
let _runCount: number = 0
let _intervalFunc: any = null
let _isJumping: boolean = false
let _jumpRepeat: number = 0

function Flappy(){
    const boxRef = useRef<HTMLDivElement | null>(null);
    const flappyRef = useRef<HTMLDivElement | null>(null);
    const [ballY, setBallY] = useState<number | undefined>(0)
    const [gameEnd, setGameEnd] = useState<boolean>(false)
    
    useEffect(() => {
            tick()
        },
    [_runCount])

    function tick(){
        console.log(_runCount)
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
        if(_jumpRepeat >= 10){
            _isJumping = false
            _jumpRepeat = 0
        }
        _jumpRepeat++   
    }

    function gameOver(){
        const tempheight = boxRef?.current?.clientHeight
        if(tempheight != undefined && _globalBallY >= tempheight - 80 || _globalBallY < -20){
            if (_intervalFunc){
                console.log("GAME OVER")
                setGameEnd(true)
                clearInterval(_intervalFunc)
            }
        }
    }

    function mainGame(){
        if(_isJumping){
            ballJump()
        }else{
            ballGravity()
        }
        gameOver()
        _runCount++
    }

    function restart(){
        _started = false
        _globalBallY = 0
        _runCount = 0
        _isJumping = false
        _jumpRepeat = 0
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
            <svg height={"20%"} width={"20%"} transform={`translate(20, ${ballY})`}>
                <circle cx="40%" cy="40%" r="30%" stroke="grey" stroke-width="4" fill="#1a1a1a" />
            </svg>
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