function solution(maps) {
    var answer = 0;
    const dx = [1,0,-1,0]; //오른쪽, 아래, 왼쪽, 위
    const dy = [0,1,0,-1]; //오른쪽, 아래, 왼쪽, 위
    const [row, col] = [maps.length, maps[0].length]; //행, 열 크기
    
    const checked = Array(maps.length).fill(0).map(()=> Array(maps[0].length).fill(0)); //해당 지점까지 가는데 걸린 최단 거리 기록
    var queue = []; //BFS를 위한 큐
    
    //아예 시작부터 막힌경우 
    if(maps[row-1][col-2] == 0 && maps[row-2][col-1] == 0) 
        return -1;
    
    queue.push([0,0]); //시작점
    checked[0][0] = 1; //방문 체크
    
    while(queue.length > 0) {
        var [y, x] = queue.shift();
        
        //도착지에 도달한 경우
        if(y === row-1 && x === col-1) {
            return checked[y][x]; //최단 거리 return
        }
        
        //오른쪽, 아래, 왼쪽 위로 이동할 수 있으므로 각 경우에 대해 탐색
        for(var i=0;i<4;i++){
            let nextX = x+dx[i];
            let nextY = y+dy[i];
            //갈 수 있는 범위인지 체크
            if(nextX >= col || nextX < 0 || nextY >= row || nextY < 0 )
                continue;
            //벽 체크, 방문 체크
            if(maps[nextY][nextX] == 0 || checked[nextY][nextX] > 0)
                continue;
            //갈 수 있는 곳이라면
            queue.push([nextY, nextX]);
            checked[nextY][nextX] = checked[y][x]+1; // 해당 지점까지 가는데 걸리는 최단 거리 업데이트
        }
    }
    //도착지에 못 도착한 경우
    return -1;
}