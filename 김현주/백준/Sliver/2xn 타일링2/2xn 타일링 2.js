
const fs = require("fs");
const input = fs.readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt").toString().trim().split('\n')

//const [C, N] = input[0].split(" ").map(Number);
const N = Number(input[0]);

//const arr = input.slice(1).map(Number);
//const map = input.slice(1).map(_ => _.trim().split(' ').map(Number));

function main() {
    const dp = new Array(N).fill(0);
    dp[0] = 1;
    dp[1] = 3;
    const MOD = 10007

    for(let i=2;i<N;i++) {
        dp[i] = (dp[i-1] + dp[i-2]*2)%MOD;
    }

    console.log(dp[N-1]%MOD);
    
}

main();