/*
const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
*/
const input = require('fs').readFileSync('dev/stdin').toString().trim().split('\n');
const [N, M, R] = input[0].split(' ').map(Number);
let arr = input.slice(1).map(_ => _.trim().split(' ').map(Number));

function rotateArr(arr) {
    let startR=0;
    let startC=0;
    let endR=N-1;
    let endC=M-1;
    
    let newArr = Array.from({length:N}, ()=>new Array(M).fill(0));
    while(startR<endR && startC<endC) {
        //위
        for(let curC=startC;curC<=endC-1;curC++) {
            newArr[startR][curC] = arr[startR][curC+1];
        }
        //왼쪽
        for(let curR=startR+1;curR<=endR;curR++) {
            newArr[curR][startC] = arr[curR-1][startC];
        }
        //아래
        for(let curC=startC+1;curC<=endC;curC++) {
            newArr[endR][curC] = arr[endR][curC-1];
        }
        //오른쪽
        for(let curR=startR;curR<=endR-1;curR++) {
            newArr[curR][endC] = arr[curR+1][endC];
        }
        startR++;
        startC++;
        endR--;
        endC--;
    }
    return newArr;
}

function printArr(arr) {
    const result = [];
    arr.map((line) => result.push(line.join(' ')));
    console.log(result.join('\n'));
}

function main() {
    let newArr = [...arr];

    for(let i=0;i<R;i++) {
        newArr = rotateArr(newArr);
    }
    printArr(newArr);
}

main();