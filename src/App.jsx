
import Player from './components/Player.jsx'
import Log from './components/Log.jsx'
import GameOver from './components/GameOver.jsx'
import GameBoard from './components/GameBoard.jsx'
import { useState } from 'react'

import { WINNING_COMBINATIONS } from './winning-combinations.js'

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

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

  // set the game boare state based on the turn history
  // deep the board so initialGameBoard never gets written to
  let gameBoard = [...initialGameBoard.map(array => [...array])];
  // let gameBoard = initialGameBoard;
  for (const turn of gameTurns) {
    const { square, player } = turn;
    gameBoard[square.rowIndex][square.colIndex] = player;
  }

  let winner = null;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSymbol = gameBoard[combination[2].row][combination[2].column];

    // if the gameboard has the 3 winning combinations equal to the same character (and not null), then we have a winner
    if (firstSymbol && firstSymbol === secondSymbol && firstSymbol === thirdSymbol) {
      winner = firstSymbol;
    }
  }
  // check if it's a draw. We need to show a gameover screen then.
  const hasDraw = gameTurns.length === 9 && !winner


  function handleReset() {
    console.info("resetting game!");
    setGameTurns([]);
  }

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
        {/* The GameOver component will be hidden upon reset, since there is no winner/draw condition */}
        {(winner || hasDraw) && <GameOver winner={winner} onRematchClicked={handleReset} />}

        <GameBoard onSelectSquare={handleSelectSquare}
          activePlayerSymbol={activePlayer}
          board={gameBoard}
        />
      </div>
      <Log turns={gameTurns} />
    </main >
  )
}

export default App
