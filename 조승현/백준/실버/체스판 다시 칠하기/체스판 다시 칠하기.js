const fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const size = input.shift();
const arr = input.map(v => v.split(""));
const [N, M] = size.split(' ').map(Number);

function solution(N,M,arr) {
    let answer = Number.MAX_SAFE_INTEGER;

	// 현재 체스칸과 인접한 체크칸 비교 (오른쪽, 바로 아래)
    const dx = [0, 1];
    const dy = [1, 0];
    
	// 8x8로 체스판을 만들어야 하기 때문에 i < N-7 / j < M-7까지 반복합니다.
    for(let i = 0 ; i < N - 7 ; i++) {
        for(let j = 0 ; j < M - 7 ; j++) {
			// 현재 체스칸 색상
            let currentColor = arr[i][j];
			// 현재 체스칸 반대 색상
            let reverseColor = currentColor === 'B' ? 'W' : 'B';

			// 현재 체스칸을 탐색 했는지 체크할 체크 배열
            const ch = Array.from({length: N}, () => Array(M).fill(false));
            ch[i][j] = true;
            
			// 색칠 한 체스칸 수 기록
            let currentLength = 1;
            let reverseLength = 0;
            
            const queue = [[i,j,currentColor,reverseColor]]
            while(queue.length > 0) {
                
                const [x, y, current, reverse] = queue.shift();
                
                for(let k = 0 ; k < 2 ; k++) {
                    const nx = x + dx[k];
                    const ny = y + dy[k];
                    
					// 시작 좌표부터 + 7 까지만 탐색 범위를 넘어가면 continue
					// 인접한 좌표가 M 또는 N을 넘어가는 경우 continue
                    if(nx > i + 7 || ny > j + 7 || nx >= N || ny >= M) continue;

					// 이미 체크한 체스칸인 경우 continue
                    if(ch[nx][ny]) continue;
                    
                    if(current === arr[nx][ny]) {
					// 인접한 좌표의 색상을 칠해야 하는 경우
                        queue.push([nx,ny,reverse,current])
                        reverseLength++;
                    } else {
					// 인접한 좌표의 색상을 칠하지 않는 경우
                        queue.push([nx,ny,reverse,current])
                        currentLength++
                    }
                    ch[nx][ny] = true;
                }
            }

            answer = Math.min(answer, currentLength, reverseLength);
        }
    }
    
    return answer;
};

console.log(solution(N,M,arr))