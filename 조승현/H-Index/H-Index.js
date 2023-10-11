// 1차 풀이
function solution(citations) {
    let answer = 0;
    for(let i = 1; i <= citations.length; i++) {
        let cnt = 0;
        for(const article of citations) {
            if(i <= article) cnt++;
            if(cnt >= i) {
                answer = i;
                break;
            }
        }
    }
    return answer;
}


// 2차 풀이
function solution1(citations) {
    let Hindex = 0;
    citations.sort((a,b) => b - a) // 내림차순 정렬
    for(let i=0;i<citations.length;i++) {
        if(citations[i] >= i+1) {
            Hindex = i+1
        }
    }
    return Hindex;
}