function solution(n, wires) {
    var answer = Number.MAX_SAFE_INTEGER;

    const BFS = (wires, node) => {
        const visited = [];
        const queue = [node];
        
        while(queue.length > 0) {
            const start = queue.pop();
            wires.forEach(wire => {           
                if(wire.includes(start)) { //만약 start노드가 현재 wire에 있다면                
                    const end = wire.find(node => node !== start); //해당 간선의 end노드에 대해서 체크     
                    if(!visited.includes(end)) { //방문 안했다면 queue에 넣기
                        queue.push(end);
                    }
                }
            })
            visited.push(start); //방문 완료 체크
        }
        return visited.length; //연결된 노드(자식)의 개수 반환
    }
    
    
    wires.forEach((wire,i) => {
        //간선이 끊어진 wires tree
        const splitWires = wires.filter((_,j) => i!==j);
        
        //[start-end] 사이 간선이 끊어짐
        const start = wire[0];
        const end = wire[1];
        
        const startTree = BFS(splitWires, start); //start node의 자식 개수
        const endTree = BFS(splitWires, end); //end node의 자식 개수
        const gap = Math.abs(startTree - endTree); //두 전력망이 가진 송전탑 개수의 차이(절대값)
        answer = Math.min(answer, gap); //가장 차이가 적을 때 update  
    }) 

    return answer;
    
}