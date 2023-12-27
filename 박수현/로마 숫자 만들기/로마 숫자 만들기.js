const fs = require("fs");
const input = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `./input.txt`
)
  .trim()
  .split("\n");

const n = Number(input);
const numbers = [1, 5, 10, 50];
const visited = Array(1001).fill(false);

let answer = 0;

function dfs(depth, idx, sum) {
  if (depth === n) {
    if (!visited[sum]) {
      visited[sum] = true;
      answer++;
    }
    return;
  }

  for (let i = idx; i < 4; i++) {
    dfs(depth + 1, i, sum + numbers[i]);
  }
}

dfs(0, 0, 0);

console.log(answer);
