function solution(m, n, board) {
    let answer = 0;
    let newBoard = board.map(block => [...block]);
    const checkBoard = board.map(block => [...block]);
    //m-1, n-1까지 돌면서 체크한 다음 지울 수 있으면 체크
    //체크된 곳들 전부 지우기
    //0으로 빈 곳들 당겨주기
    while(true) {
        let isDeleted = false; //한번도 안 지워졌는지 체크
        for(let r=0;r<m-1;r++) {
            for(let c=0;c<n-1;c++) {
                const block = newBoard[r][c];
                if (block === ' ') //이미 지워져서 빈 공간이면 pass
                    continue;
                if(newBoard[r][c+1] !== block || //4개 다 같은지 체크
                   newBoard[r+1][c] !== block ||
                   newBoard[r+1][c+1] !== block) {
                    continue;
                }
                checkBoard[r][c] = ' ';
                checkBoard[r][c+1] = ' ';
                checkBoard[r+1][c] = ' ';
                checkBoard[r+1][c+1] = ' ';
                isDeleted = true;
            }
        }
        
        if(isDeleted === false) {
            break;
        }

        for(let c=0; c<n; c++) {
            for (let r=0; r<m-1; r++){
                if (checkBoard[r+1][c] == ' ') {
                    for (let i=r; i>=0; i--) {
                        checkBoard[i + 1][c] = checkBoard[i][c];
                        checkBoard[i][c] = ' ';
                    }
                }
            }
        }
        newBoard = checkBoard.map((block) => [...block]);
    }
    
   
    answer = newBoard.flat().filter(data => data === ' ').length
    
    return answer;
}