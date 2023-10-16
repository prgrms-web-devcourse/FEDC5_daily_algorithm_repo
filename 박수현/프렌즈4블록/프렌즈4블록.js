function solution(m, n, board) {
  var answer = 0;

  // 1: 문자열을 배열로 변환
  board = board.map((item) => item.split(""));

  while (true) {
    let popped = [];

    // 2: 터트릴 배열에 추가
    for (let i = 0; i < m - 1; i += 1) {
      for (let j = 0; j < n - 1; j += 1) {
        if (board[i][j] === "-") continue;

        if (
          board[i][j] === board[i + 1][j] &&
          board[i + 1][j] === board[i][j + 1] &&
          board[i][j + 1] === board[i + 1][j + 1]
        ) {
          popped.push([i, j]);
          popped.push([i + 1, j]);
          popped.push([i, j + 1]);
          popped.push([i + 1, j + 1]);
        }
      }
    }

    // 3: 터트릴게 없다면 종료
    if (popped.length === 0) {
      return answer;
    }

    // 4: 지울 블록을 '-'로 설정
    for (const [x, y] of popped) {
      // 중복 원소 count하지 않기 위함
      if (board[x][y] !== "-") {
        board[x][y] = "-";
        answer += 1;
      }
    }

    // 5: 블록 내리기
    for (let col = 0; col < n; col += 1) {
      for (let row = m - 1; row > 0; row -= 1) {
        for (let current = 0; current < row; current += 1) {
          if (board[current][col] !== "-" && board[current + 1][col] === "-") {
            board[current + 1][col] = board[current][col];
            board[current][col] = "-";
          }
        }
      }
    }
  }
  return answer;
}
