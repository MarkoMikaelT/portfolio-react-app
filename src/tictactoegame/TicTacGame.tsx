import React, { useState } from 'react'



const TicTacGame = () => {

  const Square = () =>{

    const [val, setVal] = useState("-")
    var prevVal = " "

    function handleClick(){
      if(prevVal == "X"){
        setVal("O")
        prevVal = "O"
        console.log(prevVal)
      }
      else{
        setVal("X")
        prevVal = "X"
        console.log(prevVal)
      }
      
    }

    return(
      <button className='btn-square' onClick={() => handleClick()}>
        {val}
      </button>
    ) 
  }

  return (
    <div className='tictacgame'>
      <div className='btn-row'>
        <Square />
        <Square />
        <Square />
      </div>
      <div className='btn-row'>
        <Square />
        <Square/>
        <Square />
      </div>
      <div className='btn-row'>
        <Square />
        <Square/>
        <Square/>
      </div>
      
    </div>
  )
}

export default TicTacGame
