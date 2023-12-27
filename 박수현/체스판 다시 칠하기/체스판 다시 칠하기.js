const fs = require("fs");
const input = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `./input.txt`
)
  .trim()
  .split("\n");

const [n, m] = input.shift().split(" ").map(Number);

const board = input;
const lines = ["WBWBWBWB", "BWBWBWBW"];
let answer = 64;

function checkBoard(row, col, num) {
  let count = 0;
  for (let x = row; x < row + 8; x++) {
    for (let y = col; y < col + 8; y++) {
      const currentLine = lines[(x + num) % 2];

      if (board[x][y] !== currentLine[y - col]) {
        count++;
      }
    }
  }
  return count;
}

for (let row = 0; row + 7 < n; row++) {
  for (let col = 0; col + 7 < m; col++) {
    for (let num = 0; num < 2; num++) {
      const count = checkBoard(row, col, num);
      if (answer > count) answer = count;
    }
  }
}
console.log(answer);
