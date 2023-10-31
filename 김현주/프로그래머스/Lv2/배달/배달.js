function solution(N, road, K) {
    const graph = Array.from({length: N+1}, 
        (v, r) => { return Array.from({length: N+1}, 
            (v, c) => r === c ? 0 : Number.MAX_SAFE_INTEGER
        )}
    )

    road.forEach(([start, end, distance]) => {
        if(graph[start][end] < distance) { //더 작은 값 이미 들어있으면 continue
            return;
        }
        graph[start][end] = distance;
        graph[end][start] = distance;
    })
   
    const visit = [1]; //방문한 노드
    
    const choose = () => {
        let min = Number.MAX_SAFE_INTEGER;
        let minPos = -1;
        for(let i=1;i<N+1;i++) {
            //선정된 적 없는 노드 중, 가장 루트에서 거리가 작은 값
            if(graph[1][i] < min && !visit.includes(i) ) {
                min = graph[1][i];
                minPos = i;
            }
        }
        return minPos;
    }
    
    //다익스트라
    //경유지(mid)를 선정 (조건 : 선정된 적 없는 노드 중, 가장 루트에서 거리가 작은 값)
    //선정되지 않은 노드에 대해서만 최단거리 업데이트 진행
    //만약 (1->min)거리 + (mid->end)거리 < (1->end)거리이면, 더 작은 값으로 업데이트
    
    for(let i=1;i<N;i++) {
        const mid = choose(); //가장 distance에서 작은 값
        visit.push(mid); //방문 체크
        for(let end=1; end<N+1; end++) { // 최단거리 업데이트
            if(!visit.includes(end)) { //최단거리 업데이트 아직 못한 애들만(방문안한거만)
                if(graph[1][mid] + graph[mid][end] < graph[1][end]) {
                    graph[1][end] = graph[1][mid] + graph[mid][end] 
                }
            }
        }
    }
        
    return graph[1].filter(dist=>dist <= K).length;
}