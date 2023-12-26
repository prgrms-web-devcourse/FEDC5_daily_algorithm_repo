const input = require('fs')
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n');

// n === 1
// 2x1 만 됨

// n === 2
// 1x2
// 2x1
// 2x2

// n === 3
// 1x2 2x1
// 1x2 2x2
// 2x1 1x2
// 2x1 2x2
// 2x2 1x2

// dp[n] = 크기가 n일 때 직사각형을 최대로 채우는 방법의 수

const n = Number(input[0]);
const dp = Array.from({ length: 1000000 }, () => 0);

dp[1] = 1;
dp[2] = 3;
// dp[3] = 5
// dp[4] = 11

for (let i = 3; i < n + 1; i++) {
  dp[i] = (dp[i - 1] + dp[i - 2] * 2) % 10007;
}

console.log(dp[n]);
