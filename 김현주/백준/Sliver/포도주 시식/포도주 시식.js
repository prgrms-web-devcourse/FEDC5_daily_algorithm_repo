/*
const fs = require("fs");
const filePath = "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
*/

const input = require('fs').readFileSync('dev/stdin').toString().trim().split('\n');


//const [N, M] = input[0].split(" ").map(Number);

const N = Number(input[0]);
const arr = input.slice(1).map(Number);
//const map = input.slice(1).map(_ => _.trim().split(''));

function main() {
    // 1. 포도주 잔을 선택하면 그 잔에 들어있는 포도주는 모두 마셔야 하고, 마신 후에는 원래 위치에 다시 놓아야 한다.
    // 2. 연속으로 놓여 있는 3잔을 모두 마실 수는 없다.

    // 6 10 13 9 8 1
    // 6 10 9 8 -> 33

    /**
     * dp[0] = 6
     * dp[1] = dp[0] + 10
     * dp[2] = dp[0] + dp[1]
     * dp[3] = dp[2] , dp[1]+arr[3], dp[0]+arr[2]+arr[3];
     * dp[4] = dp[2]
     */

    const dp = new Array(N+1).fill(0);

    arr.unshift(0);

    dp[0] = 0;
    dp[1] = dp[0]+arr[1];
    dp[2] = dp[1]+arr[2];
    dp[3] = Math.max(dp[2], dp[1]+arr[3], dp[0]+arr[2]+arr[3]);
    
    for(let i=4;i<N+1;i++) {
        dp[i] = Math.max(
            dp[i-2]+arr[i], 
            dp[i-3]+arr[i-1]+arr[i], 
            dp[i-4] + arr[i-2] + arr[i-1]
        );
    }
    
    console.log(dp[N]);
}

main();