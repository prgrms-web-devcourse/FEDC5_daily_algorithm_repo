function solution(maps) {
    let answer = -1;
    let dy = [-1,0,1,0];
    let dx = [0,1,0,-1];

    const queue = [[0,0,1]];
    while(queue.length){
        let [y, x, cnt] = queue.shift();
        if (y === maps.length-1 && x === maps[0].length-1){
            answer = cnt;
            break;
        }
        for(let i = 0; i < 4;i++){
            let my = y + dy[i];
            let mx = x + dx[i];

            if (my < 0 || mx < 0 || my>=maps.length || mx>=maps[0].length){
                continue;
            }
            
            if(maps[my][mx]===1){
                maps[my][mx] = 0;
                queue.push([my,mx,cnt+1]);   
            }
        }
    }
    return answer;
}