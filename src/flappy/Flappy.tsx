import { MutableRefObject, useEffect, useRef, useState } from "react";
import { render } from "react-dom";

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
    const boxMinSize: string = "500px";
    
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
        <div ref={boxRef} onClick={(e) => handleClick(e)} style={{width: "100%", height: "100%", minWidth: boxMinSize, minHeight: "800px", border: "solid, red 2px"}}>
            <svg width="100px" height="100px" transform={`translate(20, ${ballY})`}>
                <circle cx="50" cy="50" r="40" stroke="orange" stroke-width="4" fill="yellow" />
            </svg>
        </div>
        )
    }

    return (
        <div ref={flappyRef} className="flappygame" style={{width: "80vw", height: "100%"}}>
            {boundingBox()}
            <button onClick={() => restart()}>RESTART</button>
        </div>
    )
}

export default Flappy