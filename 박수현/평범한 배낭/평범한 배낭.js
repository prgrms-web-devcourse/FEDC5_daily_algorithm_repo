const fs = require("fs");
const input = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `./input.txt`
)
  .trim()
  .split("\n");

const [N, K] = input.shift().split(" ").map(Number);

const bags = input.map((row) => row.split(" ").map(Number));

bags.unshift(null);

const dp = Array.from({ length: N + 1 }, () => Array(K + 1).fill(0));

for (let n = 1; n <= N; n++) {
  const [weight, value] = bags[n];

  for (let k = 0; k <= K; k++) {
    if (k < weight) {
      dp[n][k] = dp[n - 1][k];
    } else {
      dp[n][k] = Math.max(dp[n - 1][k], dp[n - 1][k - weight] + value);
    }
  }
}

console.log(dp[N][K]);
