function solution(n, edge) {
    var answer = 0;
    const graph = new Map();
    edge.forEach(v => {
        graph.has(v[0]) ? graph.get(v[0]).push(v[1]) : graph.set(v[0], [v[1]])
        graph.has(v[1]) ? graph.get(v[1]).push(v[0]) : graph.set(v[1], [v[0]])
    })
    
    const queue = [1];
    const visit = new Map();   
    visit.set(1, 0);
    
    while(queue.length > 0) {
        const start = queue.shift();
        graph
            .get(start)
            .forEach(end => {
                if(visit.has(end) === false) {
                    queue.push(end)
                    visit.set(end, visit.get(start)+1);
                } 
            });   
    }

    const distance = Math.max(...visit.values());
    
    answer = [...visit.values()].filter(v=> v===distance).length
    
    return answer;
}