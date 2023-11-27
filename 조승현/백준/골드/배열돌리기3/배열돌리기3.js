const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [n, ...arr] = input.map(arr => arr.split(' '));
const [row, col, N] = n;
const r = arr.pop().map(Number);

function inversion1(arr, row, col) {
    // 상하 반전시키는 연산
    let start = (row / 2) - 1;
    let end = (row / 2);
    
    while(start >= 0) {
        [arr[start], arr[end]] = [arr[end], arr[start]]
        start--;
        end++
    }
}

function inversion2(arr, row, col) {
    // 좌우 반전시키는 연산
    for(let r = 0; r < row; r++) {
        for(let c = 0; c < col/2; c++) {
            [arr[r][c], arr[r][col-c-1]] = [arr[r][col-c-1], arr[r][c]]
        }
    }
}

function rotate(arr, row, col) {
    // 오른쪽으로 90도 회전시키는 연산
    let array = [];
    for(let c = 0 ; c < col ; c++) {
        let ar = [];
        for(let r = row - 1; r >= 0 ; r--) {
            ar.push(arr[r][c]);
        }
        array.push(ar);
    }
    
    return array;
}

function rotateR(arr, row, col) {
    // 왼쪽으로 90도 회전시키는 연산
    let array = [];
    for(let c = col - 1 ; c >= 0 ; c--) {
        let ar = [];
        for(let r = 0; r < row ; r++) {
            ar.push(arr[r][c]);
        }
        array.push(ar);
    }
    
    return array;
}

function divide(arr, row, col) {
    let r = row / 2;
    let c = col / 2;
    
    // 마지막 1번 요소 저장
    let array = [];
    for(let i = 0 ; i < r ; i++) {
        let ar = [];
        for(let j = 0; j < c ; j++) {
            ar.push(arr[i][j]);
        }
        array.push(ar);
    }
    
    // 4번 -> 1번
    for(let i = r ; i < row ; i++) {
        for(let j = 0 ; j < c ; j++) {
            arr[i-r][j] = arr[i][j];
        }
    }
    
    // 3번 -> 4번
    for(let i = r; i < row; i++) {
        for(let j = c ; j < col; j++) {
            arr[i][j-c] = arr[i][j];
        }
    }
    
    
    // 2번 -> 3번
    for(let i = 0; i < r; i++) {
        for(let j = c; j < col ; j++) {
            arr[i+r][j] = arr[i][j];
        }
    }
    
    // 1번 -> 4번
    for(let i = 0 ; i < array.length;i++) {
        for(let j = 0; j < array[i].length; j++) {
            arr[i][j+c] = array[i][j];
        }
    }
}

function divideR(arr, row, col) {
    let r = row / 2;
    let c = col / 2;

    // 마지막 2번 요소 저장
    let array = [];
    for(let i = 0 ; i < r ; i++) {
        let ar = [];
        for(let j = c; j < col ; j++) {
            ar.push(arr[i][j])
        }
        array.push(ar)
    }

    // 3번 -> 2번
    for(let i = r; i < row; i++) {
        for(let j = c; j < col ; j++) {
            arr[i-r][j] = arr[i][j]
        }
    }

    // 4번 -> 3번
    for(let i = r ; i < row ; i++) {
        for(let j = 0; j < c ; j++) {
            arr[i][j+c] = arr[i][j]
        }
    }

    // 1번 -> 4번
    for(let i = 0; i < r ; i++) {
        for(let j = 0; j < c ; j++) {
            arr[i+r][j] = arr[i][j]
        }	
    }

    // 2번 -> 1번
    for(let i = 0 ; i < array.length;i++) {
        for(let j = 0; j < array[i].length; j++) {
            arr[i][j] = array[i][j];
        }
    }
}


function solution(arr, r) {
    r.forEach(num => {
        if(num === 1) {
            // 상하 반전시키는 연산
            inversion1(arr, arr.length, arr[0].length);
        } else if(num === 2) {
            // 좌우 반전시키는 연산
            inversion2(arr, arr.length, arr[0].length);
        }else if(num === 3) {
            // 오른쪽으로 90도 회전시키는 연산
            arr = rotate(arr, arr.length, arr[0].length);
        }else if(num === 4) {
            // 왼쪽으로 90도 회전시키는 연산
            arr = rotateR(arr, arr.length, arr[0].length);
        }else if(num === 5) {
            divide(arr, arr.length, arr[0].length);
        }else if(num === 6) {
            divideR(arr, arr.length, arr[0].length);
        }
    })
    
	arr.map(array => console.log(array.join(' ')));
}

solution(arr, r)