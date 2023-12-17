"use client";

import React, { useState } from "react";
import Board from "@/app/game/components/board";
import Link from "next/link";

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);

  const [currentMove, setCurrentMove] = useState(0);

  const xIsNext = currentMove % 2 === 0;

  const currentSquares = history[currentMove];

  const handlePlay = (nextSquares: Array<string>) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];

    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  };

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        <Link href="/">List of users</Link>
      </div>
    </div>
  );
}
