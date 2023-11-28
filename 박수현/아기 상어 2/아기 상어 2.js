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

const dx = [1, -1, 0, 0, 1, -1, -1, 1];
const dy = [0, 0, 1, -1, 1, -1, 1, -1];

const queue = [];

function bfs() {
  while (queue.length > 0) {
    const [x, y] = queue.shift();

    for (let i = 0; i < 8; i++) {
      const nx = dx[i] + x,
        ny = dy[i] + y;

      if (nx < 0 || ny < 0 || nx >= n || ny >= m || board[nx][ny]) continue;

      board[nx][ny] = board[x][y] + 1;
      queue.push([nx, ny]);
    }
  }
}

for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (board[i][j]) {
      queue.push([i, j]);
    }
  }
}

bfs();

let answer = 0;

board.forEach((row) => {
  answer = Math.max(answer, ...row);
});

console.log(answer - 1);
