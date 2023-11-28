const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const N = Number(input.splice(0, 1).join(''));
const arr = input.map(v => v.split(" ").map(Number));


function solution(N, arr) {
    let answer = 0;
    let dx = [-1, 0, 1, 0];
    let dy = [0, 1, 0, -1];
    
    let start;
	// 아기 상어 위치 찾는 로직
    for(let i = 0 ; i < N; i++) {
        for(let j = 0 ; j < N; j++) {
            if(arr[i][j] === 9) {
              start = [i, j, 0];
              arr[i][j] = 0;
            }
        }
    }
    
	// 상어의 레벨?
    let shark = 2; 
    let count = 0;
    
    while(true) {
        const queue = [start];
        const visited = Array.from({length: N+1}, () => Array(N+1).fill(false));
        
        const queueCopy = [];
        while(queue.length > 0) {
            const [x, y, cnt] = queue.shift();
        
            if(arr[x][y] < shark && arr[x][y] !== 0) {
                queueCopy.push([x,y,cnt]);
            }
            
            for(let k = 0; k < 4 ; k++) {
                const nx = x + dx[k];
                const ny = y + dy[k];
                
                if(nx < 0 || ny < 0 || nx > N-1 || ny > N-1) continue;
                
				// 상어보다 물고기가 큰 경우
                if(arr[nx][ny] > shark) continue;
                
				// 방문한 경우
                if(visited[nx][ny]) continue;
                
                queue.push([nx,ny,cnt+1]);
                visited[nx][ny] = true;
            }
        }
        
        if(queueCopy.length > 0) {
            queueCopy.sort((a,b) => {
                if(a[2] !== b[2]) {
                    return a[2] - b[2];
                } else {
                    if(a[0] !== b[0]) {
                        return a[0] - b[0];
                    } else {
                        return a[1] - b[1];
                    }
                }
            })
            
            const [x,y,cnt] = queueCopy[0];
            
            arr[x][y] = 0;
            count++;
            
            if(shark === count) {
                shark++;
                count = 0;
            }
            
            start = [x,y,0];
            answer += cnt;
        } else {
            return answer;
        }
    }
}

console.log(solution(N, arr));