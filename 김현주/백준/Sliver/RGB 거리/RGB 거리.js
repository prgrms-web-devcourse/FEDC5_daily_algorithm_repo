
const fs = require("fs");
const input = fs.readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt").toString().trim().split('\n')

//const [C, N] = input[0].split(" ").map(Number);
const N = Number(input[0]);

//const arr = input.slice(1).map(Number);
const map = input.slice(1).map(_ => _.trim().split(' ').map(Number));

function main() {
    const dp = Array.from({length:N}, () => new Array(3).fill(Infinity));

    //맨 처음엔 각각 본인 값
    for(let c=0;c<3;c++) {
            dp[0][c] = map[0][c];
    }
        
    //dp시작
    for(let r=1;r<N;r++) {     
        for(let c=0;c<3;c++) {   
            //같은 색으로 연속으로 칠할 수는 없다.  
            //3개 r g b / r->r(x) g->r b->r     /방향 : 1->2 2->1,
            dp[r][c] = map[r][c] + Math.min(dp[r-1][(c+1)%3], dp[r-1][(c+2)%3]);
        }       
    }
    //console.log(dp)
    console.log(Math.min(...dp[N-1].flat()))
}

main();