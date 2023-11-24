/*
const fs = require("fs");
const filePath = "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
*/

const input = require('fs').readFileSync('dev/stdin').toString().trim().split('\n');

const N = Number(input[0]);
const map = input.slice(1).map(_ => _.trim().split(' ').map(Number));

//탐색을 위한 방향 백터
const dr = [0, 1, 0, -1];
const dc = [1, 0, -1, 0];

// 제일 처음 아기 상어 위치 저장
function initSharkPos() {
    for(let r=0;r<N;r++) {
        for(let c=0;c<N;c++) {
            if(map[r][c] === 9) { 
                map[r][c] = 0;
                return [r, c];
            }
        }
    }  
}

function feedSelector(feedQueue) {
    //정렬
    feedQueue.sort((a,b) => {
        if(a[2] !== b[2]) {//거리가 다른 경우 거리 짧은게 우선
            return a[2] - b[2];
        }
        else { //거리가 같은 경우
            if(a[0] !== b[0]) {
                return a[0] - b[0]; //가장 위에 있는 물고기가 우선
            }
            else { //가장 위에 있는 물고기가 많은 경우
                return a[1] - b[1]; //가장 왼쪽에 있는 물고기가 우선
            }
        }
    })
    return feedQueue[0];
}

function BFS(startR, startC, sharkSize) {
    const queue = [ [startR, startC, 0] ]; //탐색 시작 지점과 이동 거리
    const visited = Array.from({length:N}, ()=> new Array(N).fill(false));

    const feedQueue = []; // 먹이 후보를 저장하는 큐
    //아기 상어가 현재 상황에서 map에 먹을 수 있는 먹이가 존재하는지 탐색
    while(queue.length > 0) {
        const [curR, curC, distance] = queue.shift();

        //먹을 수 있는 먹이면 먹이 후보 큐에 추가하기
        if(map[curR][curC] < sharkSize && map[curR][curC]!== 0) {
            feedQueue.push([curR, curC, distance]);
        }

        //4방향 탐색
        for(let i=0;i<4;i++) {
            const nextR = curR + dr[i];
            const nextC = curC + dc[i];

            // 범위 체크
            if(nextR < 0 || nextR >= N || nextC < 0 || nextC >= N) {
                continue;
            }
            // 방문 체크
            if(visited[nextR][nextC] === true) {
                continue;
            }
            // 갈 수 있는 곳인지 체크
            if(map[nextR][nextC] > sharkSize) { // 같은 크기인 경우 먹지는 못해도 탐색할 수 있음!
                continue;
            }

            queue.push([nextR, nextC, distance+1]);
            visited[nextR][nextC] = true;
        }
    }
    return feedQueue;
}

function main() {
    //맨 처음 아기상어 위치 
    let [startR, startC] = initSharkPos()
    
    let sharkSize = 2; //상어 크기
    let feedCount = 0; //상어가 먹은 개수
    let time = 0; //상어가 움직인 시간

    while(true) {     
        // 현재 상어 위치에서 먹을 수 있는 먹이 후보를 모아둔 큐
        const feedQueue = BFS(startR, startC, sharkSize);

        // 만약 먹을 수 있는 먹이 후보가 없다면 탐색 종료
        if(feedQueue.length === 0) {
            break;
        }

        //먹이 후보 중 가장 우선 순위가 높은 것(왼쪽 위) 찾기
        const [feedR, feedC, distance] = feedSelector(feedQueue);

        feedCount++; // 먹이를 먹었다
        map[feedR][feedC] = 0; // 먹이를 먹고난 다음 아기상어의 위치

        [startR, startC] = [feedR, feedC]; // 다음 탐색 시작할 위치(상어의 현재 위치) 업데이트
        time += distance;  //먹이를 먹으러 가느라 이동한 거리(시간) 업데이트
        
        if(feedCount === sharkSize) { //만약 자신의 크기와 같은 수의 물고기를 먹으면
            sharkSize++; //상어 크기 증가
            feedCount = 0; // 먹은 개수는 다시 초기화
        }
    }

    console.log(time);
}

main();