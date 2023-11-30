
const fs = require("fs");
const input = fs.readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt").toString().trim().split('\n')


const [N, maxW] = input[0].split(" ").map(Number);
//const N = Number(input[0]);

//const arr = input.slice(1).map(Number);
const map = input.slice(1).map(_ => _.trim().split(' ').map(Number));

function main() {
    // 최대 무게 K=7
    // 각 물건의 무게W 와 가치V
    const dp = new Array(100001).fill(0);
    
    //dp[w] = v;
    //해당 무게w일 때의 최대 가치v 를 저장한다.
  
    
    // 물건의 개수만큼 돌기
    for(let i=0;i<N;i++) {
        const [curW, V] = map[i];   
        // totalW는 현재 물건의 무게 curW 부터 최대무게가 될 수 있는 maxW까지 될 수 있다.
        for(let totalW=maxW; totalW>=curW; totalW--) {
            //totalW무게일 때의 최대 가치 < totalW-curW(해당무게-현재물건무게)일때의 최대 가치 + 현재물건의 가치 이면, 갱신한다.
            dp[totalW] = Math.max(dp[totalW], dp[totalW-curW] + V);
        }
    }

    console.log(dp)
    //console.log(Math.max(...dp))   
}

main();