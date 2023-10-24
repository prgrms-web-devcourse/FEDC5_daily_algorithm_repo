function solution(n, results) {
    var answer = 0;
    //이기는 경우 , 지는 경우 둘 다 필요...
    //양방향 그래프?
    const graph = Array.from({length : n+1}, () => Array(n+1).fill(0));
    
    results.forEach(([winner, loser]) => {
        graph[winner][loser] = 1; //win
        graph[loser][winner] = -1; //lose
    })
    
    for(let i=1;i<=n;i++) { // 거쳐가는 선수
        for(let j=1;j<=n;j++) {
            for(let k=1;k<=n;k++) {
                //j가 i를 이기고, i가 k를 이기면, j는 k를 이긴다.
                if(graph[j][i] === 1 && graph[i][k] === 1) {
                    graph[j][k] = 1;
                    graph[k][j] = -1;
                }
                //j가 i한테 지고, i가 k한테 지면, j는 k에게 진다.
                if(graph[j][i] === -1 && graph[i][k] === -1) {
                    graph[j][k] = -1;
                    graph[k][j] = 1;
                }
            }
        }
    }
    
    for(let r=1;r<=n;r++){
        let check = 0;
        for(let c=1;c<=n;c++){
            if(graph[r][c] === 0) {
                check++;
            }
        }
        if(check === 1) answer++; //자기자신이 0인 경우 1번 제외하고 전부 순위가 정해져있을 때
    }
    
    return answer;
}