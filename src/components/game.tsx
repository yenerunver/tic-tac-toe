"use client";

import React, { useEffect, useState } from "react";

import type { ReactElement } from "react";

import Board from "@/components/board";
import { onSnapshot, query } from "@firebase/firestore";
import { movesRef } from "@/components/firebase";

const BEGINNING_STATE = Array(9).fill(null);

const GamePage = ({
  username,
  onUsernameChange,
}: {
  username: string;
  onUsernameChange: Function;
}): ReactElement => {
  const [currentSquares, setCurrentSquares] = useState([...BEGINNING_STATE]);
  const [latestPlayer, setLatestPlayer] = useState("");
  const xIsNext =
    (9 - currentSquares.filter((square) => square === null).length) % 2 === 0;

  useEffect(() => {
    const unsubscribe = onSnapshot(query(movesRef), (querySnapshot) => {
      if (!querySnapshot.size) {
        return;
      }
      const moves = [...BEGINNING_STATE];
      let tempLatestPlayer = "";
      querySnapshot.forEach((doc) => {
        moves[doc.data().square] = doc.data().sign;
        tempLatestPlayer = doc.data().player;
      });
      setCurrentSquares(moves);
      setLatestPlayer(tempLatestPlayer);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleUsernameReset = () => {
    onUsernameChange("");
  };

  return (
    <div className="game">
      <div className="game-board">
        {username && <p>Hello: {username}</p>}
        {latestPlayer && <p>Last played player: {latestPlayer}</p>}
        <Board username={username} xIsNext={xIsNext} squares={currentSquares} />
        <button
          type="button"
          onClick={handleUsernameReset}
          className="bg-gradient-to-b from-white to-gray-300 font-medium p-2 text-black uppercase w-full mt-1 inline-flex justify-center"
        >
          Back to home
        </button>
      </div>
    </div>
  );
};

export default GamePage;
