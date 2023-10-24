function solution(m, n, initialBoard) {
    const board = initialBoard.map(column => [...column]);
    const dirX = [0, 1, 1, 0];
    const dirY = [0, 0, 1, 1]
    
    // 행을 검사하면서 같은 문자가 2개 나오면 열을 검사하여 다시 똑같은 2개의 문자가 나오면 첫 인덱스 저장
    const block = [];
    for(const [i, column] of board.entries()) {
        for(const [j, row] of column.entries()) {
            if(row === 0) continue;
            if(j < n-1 && i < m-1 && board[i][j] === row && board[i][j+1] === row && board[i+1][j] === row && board[i+1][j+1] === row) {
                block.push([i,j]);
            }
        }
    }
    
    // block에 저장한 인덱스들로 board에 0으로 대체
    for(const [i, j] of block) {
        for(let k = 0; k < 4; k++) {
            board[i + dirY[k]][j + dirX[k]] = 0;
        }
    }
    
    // block에 저장된 인덱스가 없으면 종료
    if(block.length === 0) return board.flat().reduce((acc, cur) => cur == 0 ? acc + 1 : acc, 0);
    
    // 0의 위치에서 열 기준으로 위에 0 이외의 문자가 있으면 자리바꿈 > 첫 행까지 반복
    function swap(column, row) {
        if(column === 0 || board[column-1][row] === 0) return;
        
        [board[column][row], board[column-1][row]] = [board[column-1][row], board[column][row]];

        swap(column-1, row);
    }
    for(let i = 1; i < m; i++) {
        for(let j = 0; j < n; j++) {
            if(board[i][j] === 0) {
                swap(i, j);
            }
        }
    }
    
    // 저장된 인덱스가 없을때까지 재귀 호출
    return solution(m, n, board);
}