/*
const fs = require("fs");
const filePath = "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
*/

const input = require('fs').readFileSync('dev/stdin').toString().trim().split('\n');


const [N, M] = input[0].split(" ").map(Number);
//const N = Number(input[0]);
const map = input.slice(1).map(_ => _.trim().split(' ').map(Number));

function main() {
    //탐색을 위한 방향 백터
    const dr = [0, 1, 0, -1, 1, 1, -1, -1];
    const dc = [1, 0, -1, 0, 1, -1, 1, -1];

    let queue = [];
    
    for(let r=0;r<N;r++) {
        for(let c=0;c<M;c++) {
            if(map[r][c] === 1) {
                queue.push([r, c]);
            }
        }
    }  

    let count = -1;

    while(queue.length > 0) {   
        
        const nextQueue = [];

        while(queue.length > 0) {
            const [curR, curC] = queue.pop();
            for(let i=0;i<8;i++) {
                const nextR = curR + dr[i];
                const nextC = curC + dc[i];

                if(nextR < 0 || nextC < 0 || nextR >=N || nextC >=M ) {
                    continue;
                }
                if(map[nextR][nextC] === 1 ) {
                    continue;
                }

                map[nextR][nextC] = 1;
                nextQueue.push([nextR, nextC]);
            }
        }
        queue = [...nextQueue];
        count++;
    }

    console.log(count);
}

main();