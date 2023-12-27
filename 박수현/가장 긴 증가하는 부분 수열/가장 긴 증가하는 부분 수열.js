const fs = require("fs");
const input = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `./input.txt`
)
  .trim()
  .split("\n");

const n = Number(input.shift());
const arr = input[0].split(" ").map(Number);

const dp = Array.from({ length: n }, () => 1);

for (let current = 1; current < n; current++) {
  let max = 1;

  for (let prev = 0; prev < current; prev++) {
    // 앞에 있는 요소들과 비교, 앞에 있는 요소가 작다면 증가하므로 + 1
    if (arr[prev] < arr[current]) {
      max = Math.max(max, dp[prev] + 1);
    }
  }
  dp[current] = max;
}

console.log(Math.max(...dp));
