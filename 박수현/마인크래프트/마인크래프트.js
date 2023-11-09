const fs = require("fs");
const input = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : "input.txt"
)
  .trim()
  .split("\n");

const [N, M, B] = input[0].split(" ").map(Number);
const board = input.slice(1).map((item) => item.split(" ").map(Number));

let time = Infinity;
let height = -1;

for (let h = 0; h <= 256; h++) {
  let inventoryCnt = 0;
  let removedCnt = 0;

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      // 현재 높이를 만들려면 필요한 블록 수
      let currentHeight = board[i][j] - h;

      // 더 높은 높이로 만들어 줘야 함, 인벤토리 사용
      if (currentHeight < 0) {
        inventoryCnt += -1 * currentHeight;
      } else {
        // 높이를 낮춰야 함, 블록 제거
        removedCnt += currentHeight;
      }
    }
  }

  if (removedCnt + B >= inventoryCnt) {
    const totalTime = 2 * removedCnt + inventoryCnt;
    if (time >= totalTime) {
      time = totalTime;
      height = h;
    }
  }
}

console.log(time, height);
