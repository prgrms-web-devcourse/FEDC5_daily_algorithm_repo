function solution(n, wires) {
    let answer = Number.MAX_SAFE_INTEGER
    let graph = Array.from({length: n+1}, () => Array(n+1).fill(0));
    
    for(const [a,b] of wires) {
        graph[a][b] = 1;
        graph[b][a] = 1;
    }
    
    wires.forEach(([a,b]) => {
        const copy = JSON.parse(JSON.stringify(graph))
        copy[a][b] = 0;
        copy[b][a] = 0;
        
        const ch = Array.from({length: n+1}, () => 0)
        const queue = [b]
        ch[b] = 1;
        while(queue.length) {
            let s = queue.shift();
            for(let i = 0 ; i < copy[s].length; i++) {
                if(copy[s][i] === 1 && ch[i] == 0) {
                    ch[i] = 1;
                    queue.push([i]);
                }
            }
        }
        
        let filter = ch.filter(v => v === 1).length;
        answer = Math.min(answer, Math.abs(filter - (n - filter)))
    })
    
    return answer;
}