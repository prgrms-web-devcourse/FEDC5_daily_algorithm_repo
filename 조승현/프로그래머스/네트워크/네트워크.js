function dfs(n, computers) {
    var answer = 0;
    
	// 3. DFS로 순회하며 [i, j]와 연결된 컴퓨터 모두 0으로 변경
    function dfs(i,j) {
        computers[i][j] = 0;
        
        for(let k=0;k<computers[j].length;k++) {
            if(computers[j][k] === 1) {
                dfs(j,k)
            }
        }
    }
    
    for(let i = 0; i < computers.length; i++) {
        for(let j = 0; j < computers[i].length; j++) {
			// 1. 서로 연결 된 컴퓨터 찾기
            if(computers[i][j] === 1) {
				// 2. 찾았으면 네트워크 수 증가
                answer++;
                dfs(i,j);
            }
        }
    }

    return answer;
}


function bfs(n, computers) {
    var answer = 0;
    
    for(let i = 0; i < computers.length; i++) {
        for(let j = 0; j < computers[i].length; j++) {
			// 1. 서로 연결 된 컴퓨터 찾기
            if(computers[i][j] === 1) {
				// 2. 찾았으면 네트워크 수 증가
                answer++;
                let queue = [[i,j]];
				// 3. BFS로 순회하며 [i, j]와 연결된 컴퓨터 모두 0으로 변경
                while(queue.length) {
                    let [i, j] = queue.shift();
                    computers[i][j] = 0;
                    for(let k=0;k<computers[j].length;k++) {
                        if(computers[j][k] === 1) {
                            queue.push([j,k]);
                        }
                    }
                }
            }
        }
    }
    return answer;
}