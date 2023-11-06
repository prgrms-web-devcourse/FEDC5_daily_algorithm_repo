function solution(n, edge) {
    let vertex = Array.from({length:n+1}, () => []); // n개의 2차원 배열을 생성
    let ch = Array.from({length:n+1}, () => 0);      // 거리를 기록할 check 배열
    ch[1] = 1; // 1번 노드로 부터 출발
    
		// 배열에 이동 가능 노드 담기
    for(const [x,y] of edge) {
        vertex[x].push(y);
        vertex[y].push(x);
    }
    
    let queue = [];
    for(let i=0;i<vertex[1].length;i++) {
				// 1번에서 처음 갈 수 있는 노드 배열에 미리 담기
        queue.push({key: 1, value:vertex[1][i]}) // key는 출발 노드 / value는 도착 노드
    }
    
    while(queue.length > 0) {
        let {key, value} = queue.shift();
				// 한번도 방문하지 않았는지 체크하기
        if(ch[value] === 0) {
            ch[value] = ch[key] + 1;
            for(let k=0;k<vertex[value].length;k++) {
                const kValue = vertex[value][k];
                if(ch[kValue] === 0) {
                    queue.push({key: value, value: kValue});
                }
            }
        }
    }
    
    let max = Math.max(...ch);
    return ch.filter(num => num === max).length
}