
const fs = require("fs");
const input = fs.readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt").toString().trim().split('\n')

//const [C, N] = input[0].split(" ").map(Number);
const N = Number(input[0]);

const arr = input[1].split(' ').map(Number)//input.slice(1).map(Number);
//const map = input.slice(1).map(_ => _.trim().split(' ').map(Number));


function main() {
    const dp = Array.from({length: N+1}, ()=>1)
    
    for(let i=0;i<N;i++) {
        for(let j=0;j<i;j++) {
            if(arr[j] < arr[i]) {
                dp[i] = Math.max(dp[i], dp[j]+1)
            }
        }
    }
    console.log(Math.max(...dp))
}

main();