const fs = require("fs");
const input = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `./input.txt`
)
  .trim()
  .split("\n");

const [n, m] = input.shift().split(" ").map(Number);

const board = input.map((row) => row.split(" ").map(Number));

const dp = new Array(n);

for (let i = 0; i < n; i++) {
  dp[i] = new Array(m);

  for (let j = 0; j < m; j++) {
    dp[i][j] = new Array(3).fill(Infinity);
  }
}

function isValid(x, y) {
  return x > -1 && y > -1 && x < n && y < m;
}

for (let row = 0; row < n; row++) {
  if (row === 0) {
    for (let col = 0; col < m; col++) {
      for (let dir = 0; dir < 3; dir++) {
        dp[row][col][dir] = board[row][col];
      }
    }
    continue;
  }

  for (let col = 0; col < m; col++) {
    const nextRow = row - 1;

    if (isValid(nextRow, col + 1)) {
      const nextCol = col + 1;

      dp[row][col][0] =
        Math.min(dp[nextRow][nextCol][1], dp[nextRow][nextCol][2]) +
        board[row][col];
    }

    if (isValid(nextRow, col)) {
      const nextCol = col;

      dp[row][col][1] =
        Math.min(dp[nextRow][nextCol][0], dp[nextRow][nextCol][2]) +
        board[row][col];
    }

    if (isValid(nextRow, col - 1)) {
      const nextCol = col - 1;

      dp[row][col][2] =
        Math.min(dp[nextRow][nextCol][0], dp[nextRow][nextCol][1]) +
        board[row][col];
    }
  }
}

console.log(Math.min(...dp[n - 1].flat()));
