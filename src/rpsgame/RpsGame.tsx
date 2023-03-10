import {useState} from 'react'
import './RpsGame.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHandPaper, faHandScissors, faHandRock, faHandPointer} from '@fortawesome/free-solid-svg-icons'

const hands = [faHandPaper, faHandScissors, faHandRock, faHandPointer]
const winVals = ["Draw!", "Right Win!", "Left Win!"]


function RpsGame() {

    const [handNum, setHandNum] = useState(3)
    const [handRnd, setHandRnd] = useState(3)
    const [winState, setWinState] = useState("Who will win?")
    const [winCountLeft, setWinCountLeft] = useState(0)
    const [winCountRight, setWinCountRight] = useState(0)

    const nextHand = () =>{
        setHandNum(handNum + 1)
        if(handNum >= 2){
            setHandNum(0)
        }
    }

    const playHand = () =>{
        let rnd = Math.floor(Math.random() * 3)
        //console.log("PLAY HAND " + rnd)

        switch(handNum){
            case 0:{ //Paper
                switch(rnd){
                    case 0:{//Paper
                        setHandValues(winVals[0], rnd)
                        break
                    }
                    case 1:{//Scissors
                        setHandValues(winVals[1], rnd)
                        break
                    }
                    case 2:{//Rock
                        setHandValues(winVals[2], rnd)
                        break
                    }
                }
                break
            }
            case 1:{//Scissors
                switch(rnd){
                    case 1:{//Scissors
                        setHandValues(winVals[0], rnd)
                        break
                    }
                    case 2:{//Scissors
                        setHandValues(winVals[1], rnd)
                        break
                    }
                    case 0:{//Rock
                        setHandValues(winVals[2], rnd)
                        break
                    }
                }
                break
            }
            case 2:{//Rock
                switch(rnd){
                    case 2:{//Rock
                        setHandValues(winVals[0], rnd)
                        break
                    }
                    case 0:{//Paper
                        setHandValues(winVals[1], rnd)
                        break
                    }
                    case 1:{//Sci
                        setHandValues(winVals[2], rnd)
                        break
                    }
                }
                break
            }
        }
        
    }

    function setHandValues(win: string, rnd: number){
        setWinState(win)
        setHandRnd(rnd)

        winCounter(win)
    }

    function winCounter(win: string){
        console.log(win + "  ")
        switch(win){
            case winVals[1]:{ //right win
                let val = winCountRight + 1
                setWinCountRight(val) 
                break
            }
            case winVals[2]:{ //left win
                let val = winCountLeft + 1
                setWinCountLeft(val) 
                break
            }
        }
    }
    
  return (
    <div className='games'> 
        <div className='homepage-game'>
            <h1 className='win-text'>{winState}</h1>
            <button className='play-hand' onClick={playHand}>
                    PLAY
                    </button>
            <div className='rockpapersci'>
                <div className='hand-player'>
                    <h2>{winCountLeft}</h2>
                    <FontAwesomeIcon className='hand-icon' icon={hands[handNum]} onClick={nextHand}></FontAwesomeIcon>
                </div>
                <div className='hand-random'>
                    <h2>{winCountRight}</h2>
                    <FontAwesomeIcon className='hand-icon' icon={hands[handRnd]}></FontAwesomeIcon>
                </div>
            </div> 
        </div>
    </div>
  )
}

export default RpsGame
