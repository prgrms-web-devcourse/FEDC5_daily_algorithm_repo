const input = require('fs')
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n')

const n = Number(input[0])
const triangle = input.slice(1, 1 + n).map((row) => row.split(' ').map(Number))
const dp = Array.from({ length: n }, () => Array.from({ length: n }, () => 0))

dp[0][0] = triangle[0][0]

for (let i = 1; i < n; i++) {
  for (let j = 0; j < i + 1; j++) {
    if (j === 0) {
      // 삼각형의 가장 왼쪽 변
      dp[i][j] = triangle[i][j] + dp[i - 1][j]
    } else if (j === i) {
      // 삼각형의 가장 오른쪽 변
      dp[i][j] = triangle[i][j] + dp[i - 1][j - 1]
    } else {
      // 삼각형의 내부 -> 왼쪽 위, 오른쪽 위 로부터 값을 다 받아올 수 있음
      dp[i][j] = triangle[i][j] + Math.max(dp[i - 1][j - 1], dp[i - 1][j])
    }
  }
}

console.log(Math.max(...dp[n - 1]))
