const fs = require("fs");
const input = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `./input.txt`
)
  .trim()
  .split("\n");

const t = Number(input.shift());

for (let k = 0; k < t; k++) {
  const n = Number(input.shift());
  const stickers = [];

  for (let i = 0; i < 2; i++) {
    const row = input.shift().split(" ").map(Number);
    row.unshift(0);
    stickers.push(row);
  }

  console.log(stickers);

  const dp = Array.from({ length: n + 1 }, () => new Array(2).fill(0));

  // dp값은 해당 열에서 가질 수 있는 최대값
  dp[1] = [stickers[0][1], stickers[1][1]];

  /*
    50 10 100 20 40
    30 50 70 10 60
  */

  for (let i = 2; i <= n; i++) {
    dp[i][0] = Math.max(dp[i - 1][1], dp[i - 2][1]) + stickers[0][i];
    dp[i][1] = Math.max(dp[i - 1][0], dp[i - 2][0]) + stickers[1][i];
  }
  console.log(Math.max(...dp[n]));
}
