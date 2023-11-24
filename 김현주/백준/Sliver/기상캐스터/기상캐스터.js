/*
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
*/
const input = require('fs').readFileSync('dev/stdin').toString().trim().split('\n');
const [H, W] = input[0].split(" ").map(Number)
const map = input.slice(1).map(_ => _.trim().split(''));

function print2DArr(map) {
    map.forEach((line, i) => {
        const str = line.join(' ');
        console.log(str);
    })
}

function main() {
    const answer = Array.from({length: H}, () => new Array(W).fill(0))
    //오른쪽부터 탐색하며 ㅁ가장 마지막에 c가 있는지 확인
    map.forEach((line, i)=> {
        let count = -1;
        let isCloud = false;
        line.forEach((area, j) => {
            if(area !== 'c' && isCloud === false) {
                answer[i][j] = -1;
                return;
            }

            if(area === 'c') {//구름이 있다면 0
                count = 0;
                answer[i][j] = count++;
                isCloud = true;
            }
            else {
                answer[i][j] = count++;
            }           
        })
    })
    print2DArr(answer)
}

main();