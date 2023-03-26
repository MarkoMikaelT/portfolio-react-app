import RpsGame from './rpsgame/RpsGame'
import './App.css'
import TicTac from './tictactoegame/TicTacGame'

function App() {

  return (
    <div className='app-games'>
      <TicTac></TicTac>
      <RpsGame></RpsGame>
      
    </div>
  )
}

export default App
