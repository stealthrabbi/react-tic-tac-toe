const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

export default function GameBoard() {
    return <ol id="game-board">

        {initialGameBoard.map((row, rowIndex) => <li key={rowIndex}></li>)}
        <li></li>
        <li></li>
        <li></li>
    </ol>
}
return 