function solution(clothes) {
    let answer = 1;
    const map = new Map();

    clothes.map(cloth=>cloth[1]).forEach((type, index)=> { //각 종류별 의상 개수 구하기
        map.set(type,(map.get(type)||0)+1)
    })
    
    for(const value of map.values()) {
        answer *= value+1; //아예 안 입는 경우+1
    }
    
    return answer-1; //최소 한 개의 의상은 입어야 하므로 전부 안 입는 경우 제외
}