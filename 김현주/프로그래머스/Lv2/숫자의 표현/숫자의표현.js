function solution(n) {
    var answer = 1;
    for(let k=2;k<n;k++) {
        let sum = k*(k+1)/2;
        if(n < sum) {
            break;
        }
        if ((n-sum) % k == 0) {
            answer++;
        }
    }
    return answer;
}