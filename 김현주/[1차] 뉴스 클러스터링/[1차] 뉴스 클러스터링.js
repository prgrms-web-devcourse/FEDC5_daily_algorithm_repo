function solution(str1, str2) {
    let answer = 0;
    
    //전부 대문자로 변경
    str1 = str1.toUpperCase();
    str2 = str2.toUpperCase();
    
    //분해해서 넣기
    //맵 이용해서 한개씩 나올대마다 맵에 개수로 넣기
    const map1 = new Map();
    const map2 = new Map();
    
    let pattern_eng = /[a-zA-Z]/;	// 알파벳 체크
    
    let str1Size = 0;
    //str1 분해 과정
    for(let i=0;i<str1.length-1;i++) {
        let c1 = str1[i];
        let c2 = str1[i+1];
        if(!pattern_eng.test(c1) || !pattern_eng.test(c2)) {
            continue; //만약 둘 중 하나라도 알파벳이 아니면 pass
        }
        let str = c1+c2;
        map1.set(str,(map1.get(str) || 0) +1);
        str1Size++;
    }
    
    let str2Size = 0;
    //str2 분해 과정
    for(let i=0;i<str2.length-1;i++) {
        let c1 = str2[i];
        let c2 = str2[i+1];
        if(!pattern_eng.test(c1) || !pattern_eng.test(c2)) {
            continue; //만약 둘 중 하나라도 알파벳이 아니면 pass
        }
        let str = c1+c2;
        map2.set(str,(map2.get(str) || 0) +1);
        str2Size++;
    }
    
    //이제 문자열 비교!
    let intersection = 0; //교집합 개수
    //교집합 구하기
    for (let key of map1.keys()) {
        if(map2.has(key)) {
            intersection += Math.min(map1.get(key), map2.get(key));
        }
    } 
    
    //합집합 개수 = 두 집합의 크기 - 교집합 크기
    let union = str1Size + str2Size - intersection;
    
    if(union === 0) { //공집합인 경우 0으로 못 나누니 예외처리
        answer = 65536;
    }
    else {
        answer = Math.floor(intersection / union * 65536);
    }
        
    return answer;
}