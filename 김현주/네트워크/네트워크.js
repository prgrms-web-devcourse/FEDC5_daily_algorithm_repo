function solution(n, computers) {
    var answer = 0;
    
    const visit = Array.from({length:n}, () => 0)
    console.log(visit)
    //0,0(1번)에서 시작해서 dfs 하면 연결된거 전부 확인 가능
    // 연결된거 다 확인했으면 그 다음 visit안한 노드 탐색
    const dfs = (i) => {
        visit[i] = 1;
        for(let j=0;j<computers.length;j++) {
            if(computers[i][j] === 1 && visit[j] === 0){
                dfs(j);
            }
        }
    }
    
    computers.forEach((computer, i) => {
        if(visit[i] === 0) {
            dfs(i);
            answer++;
        }
    })
    
    return answer;
}