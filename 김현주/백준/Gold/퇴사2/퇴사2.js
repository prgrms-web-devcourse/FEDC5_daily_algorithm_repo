
const fs = require("fs");
const input = fs.readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt").toString().trim().split('\n')

//const [C, N] = input[0].split(" ").map(Number);
const N = Number(input[0]);

//const arr = input.slice(1).map(Number);
const map = input.slice(1).map(_ => _.trim().split(' ').map(Number));

function main() {
    //i일 까지 최대 벌 수 있는 돈
    const dp = new Array(N+1).fill(0);
    for(let i=1;i<N+1;i++) {
        //이전일까지의 일한 것과 비교해서 더 큰 값으로 갱신
        dp[i] = Math.max(dp[i], dp[i-1])
        const [day, cost] = map[i-1];
        //오늘 일하면 끝나는 날짜
        dp[i+day-1] = Math.max(dp[i+day-1], dp[i-1] + cost)
    }
    //console.log(dp)
    console.log(dp[N])
}

main();