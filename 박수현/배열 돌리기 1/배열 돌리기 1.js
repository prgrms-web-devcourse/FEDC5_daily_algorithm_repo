const fs = require("fs");
const input = (
  process.platform === "linux" ? fs.readFileSync("/dev/stdin").toString() : ``
)
  .trim()
  .split("\n");

const [n, m, r] = input[0].split(" ").map(Number);

// 1. input이 문자열이므로 줄바꿈 문자를('\n') 기준으로 배열 형태로 저장
const board = [];
input.slice(1).map((item) => {
  board.push(item.split(" ").map(Number));
});

function rotate() {
  // 3. 회전할 수 있는 사각형의 수 구하기
  const rotate_count = Math.min(n, m) / 2;

  for (let cnt = 0; cnt < rotate_count; cnt++) {
    // 4. 회전할 수 있는 사각형의 row, col 크기 구하기
    const row = n - cnt - 1;
    const col = m - cnt - 1;

    const current = board[cnt][cnt];

    // 5. 상하좌우 경우의 수를 나눠서 이동시키기

    // Top: 오른쪽 값이 현재 값이 되어야 함
    for (let j = cnt; j < col; j++) {
      board[cnt][j] = board[cnt][j + 1];
    }

    // Right: 아래 값이 현재 값이 되어야 함
    for (let j = cnt; j < row; j++) {
      board[j][col] = board[j + 1][col];
    }

    // Bottom: 왼쪽 값이 현재 값이 되어야 함
    for (let j = col; j > cnt; j--) {
      board[row][j] = board[row][j - 1];
    }

    // Left: 위에 있는 값이 현재 값이 되어야 함
    for (let j = row; j > cnt; j--) {
      board[j][cnt] = board[j - 1][cnt];
    }

    // 6. 마지막으로 교체한 2개의 값이 항상 겹침. 마지막으로 좌변 값을 변경해주었으니 시작점의 값을 저장했다가 교체해주는게 필요
    board[cnt + 1][cnt] = current;
  }
}

// 2. 회전 수(R) 만큼 회전 시작
for (let i = 0; i < r; i++) {
  rotate();
}

board.map((row) => {
  console.log(row.join(" "));
});
