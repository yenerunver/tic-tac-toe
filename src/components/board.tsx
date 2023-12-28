"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { calculateWinner, isDraw } from "./engine";
import Square from "./square";

const Board = ({
  xIsNext,
  squares,
}: {
  xIsNext: boolean;
  squares: Array<string>;
}) => {
  const searchParams = useSearchParams();
  const username = searchParams.get("username");

  const handleClick = (i: number) => {
    if (calculateWinner(squares) || isDraw(squares) || squares[i]) {
      return;
    }

    fetch("/api/move", {
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

  let status;

  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isDraw(squares)) {
    status = "Draw!";
  } else {
    status = `Next player: ${xIsNext ? "X" : "O"}`;
  }

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
    </>
  );
};

export default Board;
