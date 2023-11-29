const fs = require("fs");
const input = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `./input.txt`
)
  .trim()
  .split("\n");

const n = Number(input.shift());
const wines = [];

const dp = Array.from({ length: n }, () => 0);

input.forEach((data) => {
  wines.push(Number(data));
});

dp[0] = 0;
dp[1] = wines[0];
dp[2] = wines[0] + wines[1];

for (let i = 3; i <= n; i++) {
  dp[i] = Math.max(
    dp[i - 1],
    dp[i - 2] + wines[i - 1],
    dp[i - 3] + wines[i - 1] + wines[i - 2]
  );
}

console.log(dp[n]);
