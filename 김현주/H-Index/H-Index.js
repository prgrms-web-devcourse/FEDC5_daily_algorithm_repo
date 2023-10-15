function solution(citations) {
    citations.sort((a,b) => b-a); //내림차순 정렬
    
    let h = 0;

    citations.forEach((citation, index) => {
        let count = index+1; //논문의 개수
        if(count <= citation) { //만약 h번 이상 인용된 논문이 h편 이상인 경우
            h = count; //H-Index가 된다.
        }
        else {
            return false; //내림차순 정렬되어있으므로 나머지는 비교할 필요가 없다.
        }
    })

    return h;
}