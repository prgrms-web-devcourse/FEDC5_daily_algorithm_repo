const input = require('fs')
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n')

const [c, n] = input[0].split(' ').map(Number)
const cities = input.slice(1, 1 + n).map((row) => row.split(' ').map(Number))

// 고객의 수를 기준으로 오름차순으로 정렬
const sortedCities = cities.sort((a, b) => a[1] - b[1])

// dp[사람 수] = 비용
const dp = Array.from({ length: c + 1 }, () => Infinity)

// c 명까지 고객 늘리기
// n 개의 도시
dp[0] = 0
// 각 도시 : [비용 , 고객의 수]
for (let [cost, customer] of sortedCities) {
  if (dp[customer] > cost) {
    // dp 값 1차 갱신
    dp[customer] = cost
  }
  for (let idx = 1; idx < c + 1; idx++) {
    // 1차 값을 바탕으로 전체 갱신
    if (idx < customer) {
      // cost가 dp[idx] 보다 작으면 전부 갱신
      // 이 갱신을 해야 idx가 customer보다 클 때 작은 값으로 갱신 가능
      dp[idx] = Math.min(dp[idx], cost)
    } else {
      // dp[idx]를 dp[idx] 와 dp[idx-customer] + dp[customer] 중에 작은 것으로 전부 갱신
      dp[idx] = Math.min(dp[idx], dp[idx - customer] + dp[customer])
    }
  }
}

console.log(dp[c])
