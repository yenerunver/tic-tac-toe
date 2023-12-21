"use client";

import type { ReactElement } from "react";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";

import Board from "@/components/board";
import type { NextPageWithLayout } from "./_app";

import Layout from "../components/layout";

const GamePage: NextPageWithLayout = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);

  const [currentMove, setCurrentMove] = useState(0);

  const xIsNext = currentMove % 2 === 0;

  const currentSquares = history[currentMove];

  const handlePlay = (nextSquares: Array<string>) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];

    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  };

  const searchParams = useSearchParams();

  const username = searchParams.get("username");

  return (
    <div className="game">
      <div className="game-board">
        <p>Hello: {username}</p>
        <p>Last played player: SuCuK</p>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
    </div>
  );
};

GamePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default GamePage;
