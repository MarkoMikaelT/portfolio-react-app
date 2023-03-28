import React, { useState } from 'react'
import './TicTacGame.css'


type squareProps = {
  value : any
  onSquareClick : any
  id: string
}

const Square = (props : squareProps) =>{

  const{value, onSquareClick, id} = props
  var i = 0;
  return(
    <button id={id} className='btn-square'  onClick={() => onSquareClick()}>
      {value}
    </button>
  ) 
}

const WinCalc = (squares : any) =>{
  const winLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  for(let i = 0; i < winLines.length; i++){
    const[a, b, c] = winLines[i]
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return squares[a]
    }
  }
  return null
}

const TicTacGame = () => {

  const [squares, setSquares] = useState(Array(9).fill(null))
  const [isNext, setIsNext] = useState(true)

  const winner = WinCalc(squares)
  let status : String

  if(winner){
    status = "Winner: " + winner
  }
  else{
    status = "Next turn: " + (isNext ? "X" : "O")
  }

  function HandleClick(i : number){

    if(squares[i] || WinCalc(squares)){
      return
    }

    const nextSquares = squares.slice()
    if(isNext){
      nextSquares[i] = "X"
    }
    else{
      nextSquares[i] = "O"
    }
    setSquares(nextSquares)
    setIsNext(!isNext)
  }

  function reset(){
    setSquares(Array(9).fill(null))
  }

  return (
    <div className='tictacgame'>
      <h1 className='text-top'>TIC TAC TOE</h1>
      <div className='winstatus'>{status}</div>
      <div className='grid-squares'>
          <Square id="sq0" value={squares[0]} onSquareClick={() => HandleClick(0)}/>
          <Square id="sq1" value={squares[1]} onSquareClick={() => HandleClick(1)}/>
          <Square id="sq2" value={squares[2]} onSquareClick={() => HandleClick(2)}/>

          <Square id="sq3" value={squares[3]} onSquareClick={() => HandleClick(3)}/>
          <Square id="sq4" value={squares[4]} onSquareClick={() => HandleClick(4)}/>
          <Square id="sq5" value={squares[5]} onSquareClick={() => HandleClick(5)}/>

          <Square id="sq6" value={squares[6]} onSquareClick={() => HandleClick(6)}/>
          <Square id="sq7" value={squares[7]} onSquareClick={() => HandleClick(7)}/>
          <Square id="sq8" value={squares[8]} onSquareClick={() => HandleClick(8)}/>
      </div>
      <button className='btn-reset' onClick={() => reset()}>RESET</button>
    </div>
  )
}

export default TicTacGame
