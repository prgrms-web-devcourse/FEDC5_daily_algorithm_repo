/*
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
*/
const input = require('fs').readFileSync('dev/stdin').toString().trim().split('\n');
const [N, M, B] = input[0].split(' ').map(Number);
let arr = input.slice(1).map(_ => _.trim().split(' ').map(Number));


function main() {
    let min = Math.min(...arr.flat()); // 현재 높이가 가장 작은 값
    let max = Math.max(...arr.flat()); // 현재 높이가 가장 큰 값

    let minTime = Number.MAX_SAFE_INTEGER;
    let maxHeight = 0;

    for(let height=min; height<=max; height++) {
        let inven = B; //인벤토리
        let time = 0; //걸린 시간
        for(let r=0;r<N;r++) {
            for(let c=0;c<M;c++) {
                let count = 0; // 맞추려는 높이와 현재 높이의 차이
                if(height < arr[r][c]) { //만약 맞추려는 높이보다 더 높으면 깎기
                    count = arr[r][c] - height;
                    inven += count;
                    time += count*2; // 2초
                }
                else if(height > arr[r][c]) { //만약 맞추려는 높이보다 더 낮으면 추가하기
                    count = height - arr[r][c];
                    inven -= count;
                    time += count; // 1초
                }
            }
        }
        if(inven < 0) { // 인벤토리는 음수가 될 수 없다.
            continue;
        }
        if(time <= minTime) { //시간이 같은 경우, 더 높은 높이가 정답이 된다.
            minTime = time;
            maxHeight = height;
        }
    }
    console.log(minTime, maxHeight)
}

main();