const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [[row,col], ...arr] = input.map(v => v.split(' ').map(Number));

function bfs(start, arr, dx, dy) {
    const queue = [start];
	// 방문한 곳은 방문하면 안되기 때문에 체크 배열을 만들어 준다.
    const visited = Array.from({length: row}, () => Array(col).fill(false));
    while(queue.length > 0) {
        const [x, y, d] = queue.shift();
        for(let k = 0; k < 8; k++) {
            const nx = x + dx[k];
            const ny = y + dy[k];
            
			// 범위를 벗어난 경우
            if(nx < 0 || ny < 0 || nx > row-1 || ny > col-1) continue;
            
			// 이미 방문한 경우
			if(visited[nx][ny]) continue;

			// 다른 상어인 경우
            if(arr[nx][ny] === 1) continue;
            
			// 한번도 방문하지 않은 경우는 현재 거리를 바로 arr 배열에 넣어준다.
            if(arr[nx][ny] === 0) {
                arr[nx][ny] = d;
            } else {
				// 방문한 거리와 현재 상어 위치에서의 거리를 비교하여 더 짧은 안전 거리를 넣는다.
                const distance = Math.max(arr[nx][ny], d);
                arr[nx][ny] = distance;
            }

			// 방문 했으니 체크 해준다.
            visited[nx][ny] = true;

			// 상어의 위치가 1이라서 거리는 -로 체크했다.
            queue.push([nx,ny,d-1]);
        }
    }
}

function solution(arr) {
    let answer = 0;
    const dx = [-1,-1,0,1,1,1,0,-1];
    const dy = [0,1,1,1,0,-1,-1,-1];
    
    for(let i = 0 ; i < arr.length; i++) {
        for(let j = 0; j < arr[i].length; j++) {
			// 상어의 위치를 찾고 상어가 아닌 곳을 탐색하기
            if(arr[i][j] === 1) {
                bfs([i,j,-1], arr, dx, dy);
            }
        }
    }
    
    console.log(Math.abs(Math.min(...arr.flatMap(v => v))))
}

solution(arr);