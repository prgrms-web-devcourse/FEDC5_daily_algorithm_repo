/*
const fs = require("fs");
const filePath = "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
*/

const input = require('fs').readFileSync('dev/stdin').toString().trim().split('\n');


//const [N, M] = input[0].split(" ").map(Number);

const N = Number(input[0]);
const map = input.slice(1).map(_ => _.trim().split(''));

const visited = Array.from({length:N}, () => new Array(N).fill(false));

const dr = [0,1,0,-1];
const dc = [1,0,-1,0];

function dfs(curR, curC, color) {
    if(curR < 0 || curC < 0 || curR >= N || curC >= N) {
        return;
    }
    if(visited[curR][curC] === true) {
        return;
    }
    if(color !== map[curR][curC]) {
        return;
    }

    visited[curR][curC] = true;

    for(let i=0;i<4;i++) {
        const nextR = curR + dr[i];
        const nextC = curC + dc[i];
        dfs(nextR, nextC, color);
    }  
}

function main() {
    let count1 = 0, count2 = 0;

    //적록색약이 아닌 사람 탐색
    for(let r=0;r<N;r++) {
        for(let c=0;c<N;c++) {
            if(visited[r][c]===false) {
                dfs(r,c,map[r][c]);
                count1++;
            }
        }
    }

    //map 적록색약 버전, visited 다시 초기화
    for(let r=0;r<N;r++) {
        for(let c=0;c<N;c++) {
            if(map[r][c] === 'G' || map[r][c] === 'R') {
                map[r][c] = 'RG';
            }
            visited[r][c] = false;
        }
    }

    //적록색약인 사람 탐색
    for(let r=0;r<N;r++) {
        for(let c=0;c<N;c++) {
            if(visited[r][c]===false) {
                dfs(r,c,map[r][c]);
                count2++;
            }
        }
    }

    console.log(count1, count2);
}

main();