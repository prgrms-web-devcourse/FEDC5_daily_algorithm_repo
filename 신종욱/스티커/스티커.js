const input = require('fs')
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n');

const testCase = Number(input[0]);

for (let t = 0; t < testCase; t++) {
  const Inputs = input.slice(t * 3 + 1, (t + 1) * 3 + 1);
  const n = Number(Inputs[0]);
  const sticker = Inputs.slice(1, 3).map((row) => row.split(' ').map(Number));
  const dp = Array.from({ length: 2 }, () =>
    Array.from({ length: n }, () => 0)
  );

  // dp[0][i] = 1행 i열 까지의 최댓값
  // dp[1][i] = 2행 i열 까지의 최댓값

  // 1열
  dp[0][0] = sticker[0][0];
  dp[1][0] = sticker[1][0];

  if (n >= 2) {
    // 2열
    dp[0][1] = sticker[0][1] + dp[1][0];
    dp[1][1] = sticker[1][1] + dp[0][0];
  }

  if (n >= 3) {
    for (let i = 2; i < n; i++) {
      // 1행 i열 = 1행 i열 값 + (2행 i-1열까지의 최댓값, i-2열까지의 최댓값들 중의 최댓값)
      dp[0][i] =
        sticker[0][i] +
        Math.max(dp[1][i - 1], Math.max(dp[0][i - 2], dp[1][i - 2]));
      // 2행 i열 = 2행 i열 값 + (1행 i-1열까지의 최댓값, i-2열까지의 최댓값들 중의 최댓값)
      dp[1][i] =
        sticker[1][i] +
        Math.max(dp[0][i - 1], Math.max(dp[0][i - 2], dp[1][i - 2]));
    }
  }

  console.log('sticker', sticker);
  console.log('dp', Math.max(...dp[0], ...dp[1]));
}
