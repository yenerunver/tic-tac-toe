"use client";

import React from "react";
import { calculateWinner, isDraw } from "./engine";
import Square from "./square";

const Board = ({
  username,
  xIsNext,
  squares,
}: {
  username: string;
  xIsNext: boolean;
  squares: Array<string>;
}) => {
  const handleClick = (i: number) => {
    if (calculateWinner(squares) || isDraw(squares) || squares[i]) {
      return;
    }

    let serviceUrl =
      "https://us-central1-tic-tac-toe-d1a6f.cloudfunctions.net/move";

    if (window.location.origin === "http://localhost:3000") {
      serviceUrl = "/api/move";
    }

    fetch(serviceUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        square: i,
        sign: xIsNext ? "X" : "O",
        username,
      }),
    });
  };

  const winner = calculateWinner(squares);

  const isGameOver = winner || isDraw(squares);

  let status;

  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isDraw(squares)) {
    status = "Draw!";
  } else {
    status = `Next player: ${xIsNext ? "X" : "O"}`;
  }

  const handleGameReset = async () => {
    let serviceUrl =
      "https://us-central1-tic-tac-toe-d1a6f.cloudfunctions.net/reset";

    if (window.location.origin === "http://localhost:3000") {
      serviceUrl = "/api/reset";
    }

    await fetch(serviceUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });
  };

  return (
    <>
      <div className="mb-4">{status}</div>
      <div className="flex">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
      {isGameOver && (
        <div className="board-row">
          <button
            type="button"
            onClick={handleGameReset}
            className="bg-gradient-to-b from-gray-300 to-black font-medium p-2 text-white uppercase w-full mt-1 inline-flex justify-center"
          >
            Reset game
          </button>
        </div>
      )}
    </>
  );
};

export default Board;
