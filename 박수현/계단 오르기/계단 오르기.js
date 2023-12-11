const fs = require("fs");
const input = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `./input.txt`
)
  .trim()
  .split("\n");

const n = Number(input.shift());
const stairs = input.map((data) => Number(data));
const dp = Array.from({ length: n - 1 }, () => 0);

dp[0] = stairs[0];
dp[1] = stairs[0] + stairs[1];
dp[2] = Math.max(stairs[0], stairs[1]) + stairs[2];

for (let i = 3; i < n; i++) {
  const case1 = stairs[i] + dp[i - 2];
  const case2 = stairs[i] + stairs[i - 1] + dp[i - 3];
  dp[i] = Math.max(case1, case2);
}

console.log(dp[n - 1]);
