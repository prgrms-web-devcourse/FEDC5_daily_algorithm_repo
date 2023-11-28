const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [[N,M], ...arr] = input.map(v => v.split(" ").map(Number));
const [start,end] = arr.splice(-1).join('').split(',').map(Number);

function bfs(mid,start,end,graph) {
	// 체크 배열을 만들어줍니다.
    const visited = Array.from({length: N + 1}, () => false);
    
	// 시작 포인트를 큐에 먼저 넣고 시작합니다.
    const queue = [start];
    visited[start] = true;
    
		while(queue.length > 0) {
        const x = queue.shift();
        for(let i = 0 ; i < graph[x].length ; i++) {
            const [y, cost] = graph[x][i];
			// mid 값보다 크거나 같고 한번도 방문하지 않은 경우 탐색합니다.
            if(visited[y] === false && cost >= mid) {
                queue.push(y);
                visited[y] = true;
            }
        }
    }
    
	// end 공장 방문여부 체크
    return visited[end];
}

function solution(arr,start,end) {
    let max = 1;
	// 양방향 그래프 배열을 생성합니다.
    const graph = Array.from({length: N + 1}, () => []);
    for(let i = 0 ; i < arr.length; i++) {
        graph[arr[i][0]].push([arr[i][1], arr[i][2]]);
        graph[arr[i][1]].push([arr[i][0], arr[i][2]]);
		// 최대 중량을 찾습니다.
        max = Math.max(max, arr[i][2])
    }
    let min = 1;
    let answer = 0;
    
	// 이분 탐색
    while(min <= max) {
        const mid = Math.floor((max+min) / 2);
        if(bfs(mid,start,end,graph)) {
			// end 공장에 방문 했다면 mid 값의 중량은 가능하다는 뜻
            answer = mid;
            min = mid + 1;
        } else {
            max = mid - 1;
        }
    }
    
    return answer;
}

console.log(solution(arr,start,end))