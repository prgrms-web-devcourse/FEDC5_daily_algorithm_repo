function solution(m, n, board) {
    // 1. 2차원 배열로 쪼개기
    board = board.map(v => v.split(''));
    
    while(true) {
        const arr = [];
        // 2. 지워질 블록들 찾기
        for(let i=0;i<m-1;i++) {
            for(let j=0;j<n-1;j++) {
                if(board[i][j] && board[i][j] === board[i][j+1] 
                   && board[i][j] === board[i+1][j] 
                   && board[i][j] === board[i+1][j+1]
                  ) {
                    arr.push([i,j]);
                }
            }
        }
        
        // arr가 비워져 있으면 지금까지 지원진 0의 갯수  return 하기
        if(arr.length === 0) {
            return board.reduce((prev, cur) => {
                return prev + cur.filter(v => v === 0).length
            }, 0)
        }
        
        // 3. 찾은 배열을 순회하며 board를 지우기 (0으로 변경)
        for(const [x,y] of arr) {
            board[x][y] = 0;
            board[x][y+1] = 0;
            board[x+1][y+1] = 0;
            board[x+1][y] = 0;
        }
        
        // 4. 깨진 블록들을 위에서 부터 당겨오는 작업(재정렬)
        for(let x=m-1;x>=0;x--) {
            for(let y=0;y<n;y++) {

                for(let k=x-1;k>=0;k--) {
                    if(board[x][y]) break;
                    
                    if(board[k][y]) {
                        board[x][y] = board[k][y];
                        board[k][y] = 0;
                    }
                }
            }
        }
    }
}