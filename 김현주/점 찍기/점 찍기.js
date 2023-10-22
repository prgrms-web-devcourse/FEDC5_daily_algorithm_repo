function solution(k, d) {
    var answer = 0;    
    // d*d = x*x+ y*y 
    for(let x=0;x<=d;x+=k) {
        let maxY = Math.sqrt(d*d - x*x);
        answer += Math.floor(maxY/k) + 1;
    }
    
    return answer;
}