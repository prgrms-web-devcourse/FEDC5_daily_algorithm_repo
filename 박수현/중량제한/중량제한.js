const fs = require("fs");
const input = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `input.txt`
)
  .trim()
  .split("\n");

const [n] = input.shift().split(" ").map(Number);

const board = input.map((row) => row.split(" ").map(Number));
const [start, end] = board.pop();

const graph = Array.from({ length: n + 1 }, () => new Array());

let max_weight = 0;
let min_weight = 0;
let answer = 0;

board.forEach((row) => {
  const [a, b, weight] = row;
  graph[a].push([b, weight]);
  graph[b].push([a, weight]);

  max_weight = Math.max(max_weight, weight);
});

function bfs(weight) {
  const queue = [];
  queue.push(start);

  const visited = new Array(n + 1).fill(false);
  visited[start] = true;

  while (queue.length > 0) {
    const current = queue.shift();

    for (let i = 0; i < graph[current].length; i++) {
      const [next, nextWeight] = graph[current][i];

      if (!visited[next] && nextWeight >= weight) {
        visited[next] = true;
        queue.push(next);
      }
    }
  }

  return visited[end];
}

while (min_weight <= max_weight) {
  const mid = parseInt((max_weight + min_weight) / 2);

  if (bfs(mid)) {
    answer = mid;
    min_weight = mid + 1;
  } else {
    max_weight = mid - 1;
  }
}

console.log(answer);
