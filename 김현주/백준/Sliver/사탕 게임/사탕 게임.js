
const fs = require("fs");
const input = fs.readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt").toString().trim().split('\n')

//const [C, N] = input[0].split(" ").map(Number);
const N = Number(input[0]);

//const arr = input.slice(1).map(Number);
const map = input.slice(1).map(_ => _.trim().split(''));

function swap(curR, curC, nextR, nextC) {
    let temp = map[curR][curC];
    map[curR][curC] = map[nextR][nextC];
    map[nextR][nextC] = temp;
}

function getMaxLength() {
    //가로에서 가장 긴 것
    let rowMaxLength = 1;
    for(let r=0;r<N;r++) {
        let item = map[r][0];
        let curRowMaxLength = 1;
        for(let c=1;c<N;c++) {
            if(map[r][c] === item) {
                curRowMaxLength++;
                rowMaxLength = Math.max(curRowMaxLength, rowMaxLength);
            }
            else {
                item = map[r][c];
                
                curRowMaxLength = 1;
            }
        }   
    }
    //세로에서 가장 긴 것
    let colMaxLength = 1;
    for(let c=0;c<N;c++) {
        let item = map[0][c];
        let curColMaxLength = 1;
        for(let r=1;r<N;r++) {
            if(map[r][c] === item) { //연속해서 같은게 걸리면
                curColMaxLength++; //증가
                colMaxLength = Math.max(curColMaxLength, colMaxLength); 
            }
            else {
                item = map[r][c];
                curColMaxLength = 1; //다시초기화
            }
        }
        //여기에하면 1로나옴...
    }
    return Math.max(rowMaxLength, colMaxLength);
}

function main() {
    const dr = [1,0,-1,0]; //2방향으로 줄여도됨 어차피 중복이라.. 동남방향으로!
    const dc = [0,1,0,-1];
    let answer = getMaxLength();

    for(let curR=0;curR<N;curR++) {
        for(let curC=0;curC<N;curC++) {
            //인접 4방향 탐색
            for(let i=0;i<4;i++) {
                const nextR = curR+dr[i];
                const nextC = curC+dc[i];
                if(nextR < 0 || nextR >= N || nextC < 0 || nextC >= N) continue; //범위체크
                if(map[curR][curC] === map[nextR][nextC]) continue; //같은 종류면 안바꿈
                
                swap(curR, curC, nextR, nextC); // 교환
                answer = Math.max(getMaxLength(), answer); //최댓값 업데이트
                if(answer === N) { // answer는 최대 N이므로 이미 N이 나왔다면 더 이상 이후 과정이 필요 없다.
                    console.log(answer);
                    return;
                }
                swap(curR, curC, nextR, nextC); //다시 복구
            }       
        }
    }
    console.log(answer)
}

main();