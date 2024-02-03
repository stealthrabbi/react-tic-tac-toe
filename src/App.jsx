
import Player from './components/Player.jsx'
import Log from './components/Log.jsx'
import GameBoard from './components/GameBoard.jsx'
import { useState } from 'react'

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = 'O';
  }
  return currentPlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns(prevTurns => {
      // set current player to be opposite of most recent turn
      const currentPlayer = deriveActivePlayer(prevTurns);
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
      <Log turns={gameTurns} />
    </main >
  )
}

export default App
