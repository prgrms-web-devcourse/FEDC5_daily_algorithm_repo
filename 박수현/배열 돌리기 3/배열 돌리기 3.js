const fs = require("fs");
const input = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `./input.txt`
)
  .trim()
  .split("\n");

const command_list = input
  .slice(input.length - 1)
  .map((item) => item.split(" ").map(Number))
  .flat();

// 1. 문자열을 number 형태의 2차원 배열로 변형
const board = input
  .slice(0, input.length - 1)
  .map((item) => item.split(" ").map(Number));

let answer = board;

// 2. 저장한 명령어 리스트를 반복문을 통해 하나씩 수행
command_list.forEach((command) => {
  switch (command) {
    case 1:
      answer = solution_1(answer);
      break;
    case 2:
      answer = solution_2(answer);
      break;
    case 3:
      answer = solution_3(answer);
      break;
    case 4:
      answer = solution_4(answer);
      break;
    case 5:
      answer = solution_5(answer);
      break;
    case 6:
      answer = solution_6(answer);
      break;
  }
});

// 3. 상하 반전의 경우 배열 자체를 뒤집어주면 됨
function solution_1(board) {
  return [...board].reverse();
}

// 4. 좌우 반전의 경우 행 단위로 배열을 뒤집고 넣어줌
function solution_2(board) {
  let temp = [];
  board.forEach((row) => {
    temp.push([...row].reverse());
  });
  return temp;
}

// 5. 90도 회전의 경우 n x m에서 m x n 형태로 바뀌는 것 주의!!
function solution_3(board) {
  //  n x m -> m x n로 회전
  const n = board.length;
  const m = board[0].length;

  let temp = Array.from({ length: m }, () => new Array(n).fill(0));

  for (let row = 0; row < n; row++) {
    for (let col = 0; col < m; col++) {
      temp[col][n - row - 1] = board[row][col];
    }
  }
  return temp;
}

function solution_4(board) {
  //  n x m -> m x n로 회전
  const n = board.length;
  const m = board[0].length;

  let temp = Array.from({ length: m }, () => new Array(n).fill(0));

  for (let row = 0; row < n; row++) {
    for (let col = 0; col < m; col++) {
      temp[m - col - 1][row] = board[row][col];
    }
  }
  return temp;
}

// 6. 부분 배열의 경우 절반 행과 열의 크기를 구해놓은 다음, 4분할로 반복문 돌기
function solution_5(board) {
  const n = board.length;
  const m = board[0].length;

  let temp = Array.from({ length: n }, () => new Array(m).fill(0));

  const halfRow = n / 2;
  const halfCol = m / 2;

  for (let row = 0; row < halfRow; row++) {
    for (let col = halfCol; col < m; col++) {
      temp[row][col] = board[row][col - halfCol];
    }
  }

  for (let row = halfRow; row < n; row++) {
    for (let col = halfCol; col < m; col++) {
      temp[row][col] = board[row - halfRow][col];
    }
  }

  for (let row = halfRow; row < n; row++) {
    for (let col = 0; col < halfCol; col++) {
      temp[row][col] = board[row][col + halfCol];
    }
  }

  for (let row = 0; row < halfRow; row++) {
    for (let col = 0; col < halfCol; col++) {
      temp[row][col] = board[row + halfRow][col];
    }
  }

  return temp;
}

function solution_6(board) {
  const n = board.length;
  const m = board[0].length;

  let temp = Array.from({ length: n }, () => new Array(m).fill(0));

  const halfRow = n / 2;
  const halfCol = m / 2;

  for (let row = 0; row < halfRow; row++) {
    for (let col = 0; col < halfCol; col++) {
      temp[row][col] = board[row][col + halfCol];
    }
  }

  for (let row = 0; row < halfRow; row++) {
    for (let col = halfCol; col < m; col++) {
      temp[row][col] = board[row + halfRow][col];
    }
  }

  for (let row = halfRow; row < n; row++) {
    for (let col = halfCol; col < m; col++) {
      temp[row][col] = board[row][col - halfCol];
    }
  }

  for (let row = halfRow; row < n; row++) {
    for (let col = 0; col < halfCol; col++) {
      temp[row][col] = board[row - halfRow][col];
    }
  }

  return temp;
}

answer.forEach((row) => {
  console.log(row.join(" "));
});
