const fs = require("fs");
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = Number(input.shift());
const arr = input.map(v => [...v]);

// 행을 체크하는 함수
function colCheck(arr, col) {
    let candyLen = 0;
    let currentCandy = arr[col][0];
    let len = 1;
    for(let i = 1 ; i < N ; i++) {
        if(currentCandy === arr[col][i]) {
            len++
        } else {
            candyLen = Math.max(candyLen, len);
            currentCandy = arr[col][i];
            len = 1;
        }
    }
    
    candyLen = Math.max(candyLen, len);
    
    return candyLen;
}

// 열을 체크하는 함수
function rowCheck(arr, row) {
    let candyLen = 0;
    let currentCandy = arr[0][row];
    let len = 1;
    for(let i = 1 ; i < N ; i++) {
        if(currentCandy === arr[i][row]) {
            len++
        } else {
            candyLen = Math.max(candyLen, len);
            currentCandy = arr[i][row];
            len = 1;
        }
    }
    
    candyLen = Math.max(candyLen, len);
    
    return candyLen;
}

function solution(N, arr) {
    let candy = 0;
    const dx = [-1,0,1,0];
    const dy = [0,1,0,-1];
    
    for(let col = 0; col < N ; col++) {
		// 현재 행에서 연속해서 먹을 수 있는 사탕의 수를 구합니다.
        const colMax = colCheck(arr, col);
        candy = Math.max(candy, colMax);
        
        for(let row = 0 ; row < N ; row++) {
			// 현재 열에서 연속해서 먹을 수 있는 사탕의 수를 구합니다.
            const rowMax = rowCheck(arr, row)
            candy = Math.max(candy, rowMax);

						const currentCandy = arr[col][row]
            
			// 인접한 사탕 찾기
            for(let k = 0 ; k < 4 ; k++) {
                const nx = col + dx[k];
                const ny = row + dy[k];

				// 범위를 벗어 난 경우
                if(nx < 0 || nx >= N || ny < 0 || ny >= N) continue;
                
				// 인접한 사탕의 색이 같은 경우
                const nextCandy = arr[nx][ny];
                if(currentCandy === nextCandy) continue;
                
                
                // 인접한 사탕의 위치를 바꿔줍니다.
                [arr[col][row], arr[nx][ny]] = [arr[nx][ny], arr[col][row]];
                
				// 사탕의 위치를 바꾼 후 연속해서 먹을 수 있는 사탕의 수를 구합니다.
                const colMax = colCheck(arr, col);
                const rowMax = rowCheck(arr, row);
                
                candy = Math.max(candy, colMax, rowMax);
                
				// 사탕의 위치를 원래대로 바꿔줍니다.
                [arr[col][row], arr[nx][ny]] = [arr[nx][ny], arr[col][row]]
            }
        }
    }
    
    return candy;
}

console.log(solution(N,arr))