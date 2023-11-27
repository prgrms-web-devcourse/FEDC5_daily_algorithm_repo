function solution(board) {
    const dx = [-1,0,1,0];
    const dy = [0,1,0,-1];
    const n = board.length;
    const visit = Array.from({length: n}, () => Array.from({length:n}, () => Array(dx.length).fill(0)));
    
    const queue = [[0,0,0,0]];
    
    while(queue.length > 0) {
        const [x, y, cost, dir] = queue.shift();
        for(let k = 0; k < 4; k++) {
            const nx = x + dx[k];
            const ny = y + dy[k];
            
            if(nx < 0 || ny < 0 || nx >= n || ny >= n || board[nx][ny] === 1) continue;
            
            const direction = (k === 1 || k === 3) ? 0 : 1
            const currentCost = (x === 0 && y === 0) || dir === direction ? 100 : 600;
            
            if(visit[nx][ny][k] === 0 || visit[nx][ny][k] > cost + currentCost) {
                visit[nx][ny][k] = cost + currentCost;
                queue.push([nx, ny, cost + currentCost, direction]);
            }
        }
    }
    
    return Math.min(...visit[n-1][n-1].filter(cost => cost > 0))
}