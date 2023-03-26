import RpsGame from './rpsgame/RpsGame'
import './App.css'
import TicTac from './tictactoegame/TicTacGame'

function App() {

  return (
    <div className='app-games'>
      <RpsGame></RpsGame>
      <TicTac></TicTac>
    </div>
  )
}

export default App
