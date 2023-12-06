const fs = require("fs");
const input = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `./input.txt`
)
  .trim()
  .split("\n");

const n = Number(input.shift());
const dp = input.map((row) => row.split(" ").map(Number));

for (let row = 1; row < n; row++) {
  for (let col = 0; col < dp[row].length; col++) {
    if (col === 0) {
      dp[row][col] = dp[row - 1][col] + dp[row][col];
    } else if (col === dp[row].length - 1) {
      dp[row][col] = dp[row - 1][col - 1] + dp[row][col];
    } else {
      dp[row][col] =
        Math.max(dp[row - 1][col], dp[row - 1][col - 1]) + dp[row][col];
    }
  }
}

console.log(Math.max(...dp[n - 1]));
