/*
const fs = require("fs");
const filePath = "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
*/

const input = require('fs').readFileSync('dev/stdin').toString().trim().split('\n');

const [C, R] = input[0].split(" ").map(Number)
const map = input.slice(1).map(_ => _.trim().split(' ').map(Number));



function main() {
    const dr = [0, 1, 0, -1];
    const dc = [1, 0, -1, 0];

    //1인 곳을 찾아서 해당 좌표 queue에 넣기
    let queue = [];

    for(let r=0;r<R;r++) {
        for(let c=0;c<C;c++) {
            if(map[r][c] === 1) {
                queue.push([r, c]);
            }
        }
    }

    let count = -1;

    while(queue.length > 0) { // 0이 다 사라질때까지 하거나, 더이상 막혔을때까지 해야함
        //동시다발적으로 해야함...
        const nextQueue = [];
        //console.log(queue);
        while(queue.length > 0) {
            const [curR, curC] = queue.pop();
            for(let i=0;i<4;i++) {
                const nextR = curR + dr[i];
                const nextC = curC + dc[i];

                if(nextR < 0 || nextC < 0 || nextR >= R || nextC >= C) {
                    continue;
                }
                if(map[nextR][nextC] !== 0) {
                    continue;
                }

                map[nextR][nextC] = 1;
                nextQueue.push([nextR, nextC]);
            }   
        }

        //다음 탐색할 영역 queue에 넣기
        queue = [...nextQueue];
        
        count++;

    }
    //visit map만들어서 0이 없는지 체크. 0이 없다면 다 익은 거임
    
    for(let r=0;r<R;r++) {
        for(let c=0;c<C;c++) {
            if(map[r][c] === 0) {
                count = -1;
                break;
            }
        }
    }

    console.log(count);
}

main();