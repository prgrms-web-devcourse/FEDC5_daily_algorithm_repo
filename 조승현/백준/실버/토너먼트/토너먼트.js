const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split('\n');

const [N, user1, user2] = input.join('').split(' ').map(Number);

function solution(N, user1, user2) {
		// user2가 더 작을 수도 있기 때문에 min, max 값을 미리 구해줍니다.
    let min = Math.min(user1, user2);
    let max = Math.max(user1, user2);

    let game = 1;
    while(N > 1) {
        // min이 홀수 이고 min + 1과 max가 같다면 진행된 게임수를 return 합니다.
        if(min % 2 === 1 && min + 1 === max) return game;
        
        min = Math.ceil(min / 2);
        max = Math.ceil(max / 2);
        N = Math.ceil(N / 2);
        game++;
    }
}

console.log(solution(N, user1, user2));