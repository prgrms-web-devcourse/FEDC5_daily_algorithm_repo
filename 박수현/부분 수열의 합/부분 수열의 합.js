const fs = require("fs");
const input = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `./input.txt`
)
  .trim()
  .split("\n");

const [n, s] = input.shift().split(" ").map(Number);
const arr = input.shift().split(" ").map(Number);

let answer = 0;

function dfs(depth, sum) {
  if (depth === n) return;

  sum += arr[depth];

  if (sum === s) {
    answer++;
  }

  // 부분 집합에서 빼기
  dfs(depth + 1, sum - arr[depth]);
  // 부분 집합에 넣기
  dfs(depth + 1, sum);
}

dfs(0, 0);

console.log(answer);
