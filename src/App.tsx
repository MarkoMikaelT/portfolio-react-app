import RpsGame from './rpsgame/RpsGame'
import './App.css'
import TicTac from './tictactoegame/TicTacGame'
import Flappy from './flappy/Flappy'

function App() {

  return (
    <div className='app-games'>
      <Flappy></Flappy>
      <TicTac></TicTac>
      <RpsGame></RpsGame>
    </div>
  )
}

export default App
