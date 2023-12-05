
const fs = require("fs");
const input = fs.readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt").toString().trim().split('\n')

//const [N, M] = input[0].split(" ").map(Number);
const N = Number(input[0]);

const arr = input.slice(1).map(Number);
//const map = input.slice(1).map(_ => _.trim().split(' ').map(Number));

function main() {
    arr.unshift(0)
    const dp = new Array(N+1).fill(0)
    dp[1] = arr[1]
    dp[2] = arr[2] + dp[1]
    dp[3] = arr[3] + Math.max(dp[1], arr[2]) //1->3 , 2->3 만 존재한다.

    for(let i=4;i<=N;i++) {
        //연속 3번이 불가능 하므로 , [i-3 -> i-1 -> i] / [i-2 -> i] 2가지 경우가 존재한다.
        dp[i] = arr[i] + Math.max(arr[i-1]+dp[i-3], dp[i-2])
    }
    console.log(dp[N])
}

main();