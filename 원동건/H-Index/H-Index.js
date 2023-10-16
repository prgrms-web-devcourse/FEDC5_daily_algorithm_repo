function solution(citations) {
    citations.sort((a,b) => b-a); // 내림차순 정렬
    let Hindex = 0;
    
    for(let i = 0; i < citations.length; i++) {
        const h = citations[i]; // 인용 횟수
        
        if(h <= i + 1) {
            Hindex = i;
            break;
        }
    }
    
    return Hindex;
}