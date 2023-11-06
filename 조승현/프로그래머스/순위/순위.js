function solution(n, results) {
    var answer = 0;
		// 1. 2차원 배열을 만들어준다.
    const ch = Array.from({length: n+1}, () => Array(n+1).fill(0));
    
		// 2. ch 배열에 선수들의 이기고, 진 정보를 기록한다.
		for(const [a,b] of results) {
        ch[a][b] = 1; // 이긴 상대 - 1
        ch[b][a] = 2; // 진 상대 - 2
    }
    
    for(let i = 1 ; i < ch.length; i++) {
        for(let k = 1; k < ch[i].length; k++) {
            // 3. i선수가 k선수를 이겼을 때 BFS로 순회한다.
            if(ch[i][k] === 1) {
								const queue = [];
                queue.push(k);
                while(queue.length > 0) {
                    let s = queue.shift();
                    for(let j = 1;j<ch[s].length;j++) {
						// k선수가 이긴 j선수는 i선수도 이기는 조건에 따라 i선수 배열에 j선수를 체크한다.(1)
                        if(ch[s][j] === 1 && ch[i][j] !== 1) {
                            ch[i][j] = 1;
                            queue.push(j)
                        }
                        
						// i선수가 진 선수는 k선수도 이길 수 없기에 체크한다.(2)
                        if(ch[i][j] === 2) {
                            ch[s][j] = 2;
                        }
                    }
                }
            }
        }
    }
    
	// 4. 0번, 자신을 제외한 모든 선수와의 전적 확인
    return ch.filter(node => 
           node.filter(n => n === 0).length < 3).length;
}