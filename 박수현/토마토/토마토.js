class Queue {
  constructor() {
    this.queue = [];
    this.front = 0;
    this.rear = 0;
  }

  enqueue(value) {
    this.queue[this.rear++] = value;
  }

  dequeue() {
    const value = this.queue[this.front++];
    return value;
  }

  size() {
    return this.rear - this.front;
  }
}

const fs = require("fs");
const input = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `input.txt`
)
  .trim()
  .split("\n");

const [m, n] = input.shift().split(" ").map(Number);
const board = input.map((row) => row.split(" ").map(Number));

const dx = [1, -1, 0, 0],
  dy = [0, 0, 1, -1];

const queue = new Queue();

for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    const cnt = board[i][j];

    if (cnt === 1) {
      queue.enqueue([i, j]);
    }
  }
}

while (queue.size() > 0) {
  const [x, y] = queue.dequeue();

  for (let i = 0; i < 4; i++) {
    const nx = dx[i] + x,
      ny = dy[i] + y;

    if (nx < 0 || ny < 0 || nx >= n || ny >= m) continue;

    if (board[nx][ny] === 0) {
      board[nx][ny] = board[x][y] + 1;
      queue.enqueue([nx, ny]);
    }
  }
}

let day = 0;

for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (board[i][j] === 0) {
      console.log(-1);
      return;
    }
    day = Math.max(day, board[i][j]);
  }
}

console.log(day - 1);
