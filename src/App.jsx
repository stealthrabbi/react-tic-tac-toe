
import Player from './components/Player.jsx'
import Log from './components/Log.jsx'
import GameBoard from './components/GameBoard.jsx'
import { useState } from 'react'

function App() {

  const [activePlayer, setActivePlayer] = useState('X');
  const [gameTurns, setGameTurns] = useState([]);

  function handleSelectSquare(rowIndex, colIndex) {
    setActivePlayer((curActivePlayer) => curActivePlayer === "X" ? "O" : "X")
    setGameTurns(prevTurns => {
      // set current player to be opposite of most recent turn
      let currentPlayer = "X";
      if (prevTurns.length > 0 && prevTurns[0].player === "X") {
        currentPlayer = 'O';
      }
      // copy the previous turns, and add the new turn
      const updatedTurns = [{ square: { rowIndex, colIndex }, player: currentPlayer }, ...prevTurns];
      return updatedTurns;
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="Player-1" symbol="X" isActive={activePlayer === "X"} />
          <Player initialName="Player-2" symbol="0" isActive={activePlayer === "O"} />
        </ol>

        <GameBoard onSelectSquare={handleSelectSquare}
          activePlayerSymbol={activePlayer}
          turns={gameTurns}
        />
      </div>
      <Log />
    </main >
  )
}

export default App
