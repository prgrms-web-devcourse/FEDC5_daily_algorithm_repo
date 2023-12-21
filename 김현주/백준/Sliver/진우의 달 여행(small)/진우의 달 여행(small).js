
const fs = require("fs");
const input = fs.readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt").toString().trim().split('\n')


const [N, M] = input[0].split(" ").map(Number);
//const N = Number(input[0]);

//const arr = input.slice(1).map(Number);
const map = input.slice(1).map(_ => _.trim().split(' ').map(Number));



function main() {
    //현재 위치로 올 수 있는 위치 후보 3개
    const dir = [ [-1, -1], [-1, 0], [-1, 1] ];
    //3차원 DP배열
    const dp = Array.from({length:N}, () => Array.from({length:M}, ()=> new Array(3).fill(Infinity)));

    //맨 처음 출발할 때는 방향 상관 없이 본인 값으로 시작.
    for(let c=0;c<M;c++) {
        for(let i=0;i<3;i++) {
            dp[0][c][i] = map[0][c];
        }
    }
        
    //dp시작
    for(let r=1;r<N;r++) {     
        for(let c=0;c<M;c++) {           
            dir.forEach(([dr, dc], i) => {
                const prevR = r+dr;
                const prevC = c+dc;
                //유효범위 체크
                if(prevR < 0 || prevC < 0 || prevR>= N || prevC >= M) {
                    return;
                }
                //우주선은 전에 움직인 방향으로 움직일 수 없다.
                dp[r][c][i] = map[r][c] + Math.min(dp[prevR][prevC][(i+1)%3], dp[prevR][prevC][(i+2)%3]);
            })
        }       
    }
    //console.log(dp)
    console.log(Math.min(...dp[N-1].flat()))
}

main();