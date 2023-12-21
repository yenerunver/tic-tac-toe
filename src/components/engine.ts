const lines: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const calculateWinner = (squares: Array<string>) => {
  for (let i = 0; i < lines.length; i += 1) {
    const [a, b, c] = lines[i];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
};

const isDraw = (squares: Array<string>) =>
  calculateWinner(squares) === null &&
  squares.filter((value) => value === null).length === 0;

export { isDraw, calculateWinner, lines };
