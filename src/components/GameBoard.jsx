const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

// have the onSelectSquare event as a prop of this component. 
// This allows user of the component to hook in to the event of the GameBoard
// so App can track which is the current player
export default function GameBoard({ onSelectSquare, turns }) {

    // set the game boare state based on the turn history
    let gameBoard = initialGameBoard;
    for (const turn of turns) {
        const { square, player } = turn;
        console.info(square);
        initialGameBoard[square.rowIndex][square.colIndex] = player;
    }

    // Note: we used to have this, where the gameboard tracked the current system state

    // const [gameBoard, setGameBoard] = useState(initialGameBoard);

    // function handleSelectSquare(rowIndex, colIndex,) {
    //     setGameBoard((prevGameBoard) => {
    //         console.info(`handleSelectSquare(), ${rowIndex}, ${colIndex}`)
    //         const updatedBoard = [...prevGameBoard].map(innerArray => [...innerArray]);
    //         updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
    //         return updatedBoard;
    //     });

    //     onSelectSquare();
    // }


    return <ol id="game-board">
        {gameBoard.map((row, rowIndex) =>
            <li key={rowIndex}>
                <ol>
                    {row.map((playerSymbol, colIndex) =>
                        <li key={colIndex}>
                            <button onClick={() => onSelectSquare(rowIndex, colIndex)}>{playerSymbol}</button>
                        </li>)}
                </ol>
            </li>
        )}
    </ol>
}