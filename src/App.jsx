import resetIcon from "./reset.svg"
import "./App.css";
import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function ResetBtn({resetGame}) {
  return <button className="reset-btn" onClick={resetGame}><img className="reset-btn"src={resetIcon} alt="play again" /></button>
}

function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  function handleClickReset() {
    const resetSquares = squares.slice()
    for (let i = 0; i < resetSquares.length; i++) {
      resetSquares[i] = null
    }
    setSquares(resetSquares)
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = `${winner} WON!` ;
  } else {
    status = (xIsNext ? "X" : "O") + `'s turn`;
  }

  return (
      <div className="main">
        <h1>Tic-Tac-Toe</h1>
        <div className="header">
        <h2 className="status">{status}</h2>
        <ResetBtn resetGame={handleClickReset}/>
        </div>
        <div className="board">
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>
        <footer>
          <p>Coded by <a href="https://github.com/claraferraz">Clara Ferraz</a></p>
        </footer>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Board;
