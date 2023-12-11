const fs = require("fs");
const input = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `./input.txt`
)
  .trim()
  .split("\n");

const n = Number(input.shift());
const grid = input.map((row) => row.split(""));
const grid2 = input.map((row) => row.replace(/R/g, "G").split(""));

let visited = Array.from({ length: n }, () => Array(n).fill(false));

const dx = [1, -1, 0, 0];
const dy = [0, 0, 1, -1];

function bfs(i, j, board) {
  const queue = [];
  queue.push([i, j]);

  while (queue.length > 0) {
    const [x, y] = queue.shift();

    for (let i = 0; i < 4; i++) {
      const nx = dx[i] + x,
        ny = dy[i] + y;

      if (nx < 0 || ny < 0 || nx >= n || ny >= n) continue;

      if (visited[nx][ny] === false && board[nx][ny] === board[x][y]) {
        visited[nx][ny] = true;
        queue.push([nx, ny]);
      }
    }
  }
}

let cnt = 0;
let cnt2 = 0;

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (visited[i][j] === false) {
      bfs(i, j, grid);
      cnt += 1;
    }
  }
}

visited = Array.from({ length: n }, () => Array(n).fill(false));

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (visited[i][j] === false) {
      bfs(i, j, grid2);
      cnt2 += 1;
    }
  }
}

console.log(cnt, cnt2);
