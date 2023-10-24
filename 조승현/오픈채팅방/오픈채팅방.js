function solution(record) {
    let answer = [];
    let map = new Map();
    for(const a of record) {
        const s = a.split(" ");
        if(s[0] !== "Leave") {
            map.set(s[1], s[2]);
        }
    }
    
    for(const a of record) {
        let s = a.split(" ");
        const enter = `${map.get(s[1])}님이 들어왔습니다.`;
        const leave = `${map.get(s[1])}님이 나갔습니다.`;
        if(s[0] !== "Change") {
            s[0] === "Enter" 
                ? answer.push(enter) : answer.push(leave); 
        }
    }
    
    return answer;
}


// 변수 단축형
function solution1(record) {
    let answer = [];
    let map = new Map();
    for(const a of record) {
        const s = a.split(" ");
        if(s[0] !== "Leave") {
            map.set(s[1], s[2]);
        }
    }
    
    for(const a of record) {
        let s = a.split(" ");
        const enter = `${map.get(s[1])}님이 들어왔습니다.`;
        const leave = `${map.get(s[1])}님이 나갔습니다.`;
        if(s[0] !== "Change") {
            s[0] === "Enter" 
                ? answer.push(enter) : answer.push(leave); 
        }
    }
    
    return answer;
}