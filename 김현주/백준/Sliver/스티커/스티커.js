
const fs = require("fs");
const input = fs.readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt").toString().trim().split('\n')

//const [C, N] = input[0].split(" ").map(Number);
const test_case = Number(input[0]);
const cases = input.slice(1);

//const arr = input.slice(1).map(Number);
//const map = input.slice(1).map(_ => _.trim().split(' ').map(Number));


function solution(N, top, bottom) {
    //3가지 경우
    // 1. 0번째 열에서 아무것도 안고를 때
    // 2. 0번째 열에서 위에꺼를 고를 때
    // 3. 0번째 열에서 아래꺼를 고를 때 
    const dp = [[0, top[0], bottom[0]]]; 
    for(let i=1;i<N;i++) {
        dp[i] = [
            Math.max(...dp[i-1]), // i번째 열에서 아무것도 안 고를거니까, 이전 열에서의 최대 값
            Math.max(dp[i-1][0], dp[i-1][2]) + top[i], // i번째 열의 위에꺼 + 이전 열에서 아예 안 고르거나 아래꺼 골랐을 때 중 더 큰 값
            Math.max(dp[i-1][0], dp[i-1][1]) + bottom[i], //i번째 열의 아래꺼 + 이전 열에서 아예 안 고르거나 위에꺼 골랐을 때 중 더 큰 값
        ]
    }
    //console.log(dp)
    return Math.max(...dp[N-1]);
}

function main() {
    for(let i=0;i<test_case;i++) {
        const N = cases[i*3];
        const top = cases[i*3+1].split(' ').map(Number)
        const bottom = cases[i*3+2].split(' ').map(Number)
        console.log(solution(N, top, bottom));
    }
}

main();