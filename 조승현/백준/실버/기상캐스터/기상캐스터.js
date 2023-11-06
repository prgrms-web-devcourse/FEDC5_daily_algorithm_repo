const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [, ...arr] = input.map(v => v.split(''))

function solution(arr) {
    const H = arr.length;
    const W = arr[0].length;
    
    const array = arr.map(weather => weather.map(v => v === 'c' ? 0 : -1))
    
    
    for(let row = 0 ; row < H ; row++) {
        for(let col = 1 ; col < W; col++) {
            if(array[row][col-1] >= 0 && array[row][col] === -1) {
                array[row][col] = array[row][col-1] + 1;
            }
        }
    }
    
    array.map(v => console.log(v.join(' ')))
}

solution(arr)