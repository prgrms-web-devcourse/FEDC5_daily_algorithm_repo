/*
const fs = require("fs");
const filePath = "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
*/

const input = require('fs').readFileSync('dev/stdin').toString().trim().split('\n');

const [N, M] = input[0].split(" ").map(Number);
const map = input.slice(1, M+1).map(_ => _.trim().split(' ').map(Number));
const [from, to] = input[M+1].split(" ").map(Number);

let graph = Array.from({length: N+1}, ()=>[]);

function BFS(mid) {
    const queue = [ from ];
    const visited = Array.from({length : N+1}, ()=> false );
    visited[from] = true;

    while(queue.length > 0) {
        const start = queue.shift();
        if(start === to) { //목적지 도착했다면 성공!
            return true;
        }
        for(let i=0;i<graph[start].length;i++) { //start에서 연결되어있는 모든 end에 대해 탐색
            const end = graph[start][i][0];
            const weight = graph[start][i][1];

            if(visited[end] === true) { //이미 방문했다면 pass
                continue;
            }
            if(mid > weight) { //중량 제한을 초과한다면 pass
                continue;
            }

            visited[end] = true;
            queue.push(end);
        }
    }
    return false; //끝까지 목적지에 도착하지 못했다면 중량 조건이 안맞은 것...
}

function main() {
    let answer = 0;
    let left = 0, right = 0;

    //graph 생성
    map.forEach(([start, end, weight]) => {
        graph[start].push([end, weight]);
        graph[end].push([start, weight]);
        if(right < weight) { //탐색 최대 값
            right = weight;
        }
    })
    
    //이분 탐색
    //범위를 좁혀 나가며 답의 번위를 줄여나간다.
    //답의 범위가 완전히 좁혀지면 (left === right) 답을 최종적으로 찾을 수 있다.
    while(left <= right) {
        let mid = Math.floor((left + right) / 2);
        if(BFS(mid)) { //목적지 도착했으면 left+1 해서 최댓값 늘려보기
            left = mid + 1;
            answer = mid; //최댓값 갱신
        }
        else { //목적지 도착 못했으면 right-1 해서 다시 탐색
            right = mid - 1;
        }
    }
    
    console.log(answer);
}

main();