"use client";

import React, { MouseEventHandler } from "react";

const Square = ({
  value,
  onSquareClick,
}: {
  value: string;
  onSquareClick: MouseEventHandler;
}) => (
  <button
    type="button"
    className="h-10 text-xl font-bold bg-white text-black w-1/3 float-left border-2 border-black"
    onClick={onSquareClick}
  >
    {value}
  </button>
);

export default Square;
