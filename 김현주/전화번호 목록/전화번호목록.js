function solution(phone_book) {
    var answer = true;
    const map = new Map();//탐색을 빨리 하기 위한 해시 맵
    phone_book.forEach((number, index) => {
        map.set(number, 1); //key에 전화번호, value는 의미x
    })
    
    for(const number of phone_book) { //전화번호를 탐색하며
        for(let i=1;i<number.length;i++){ //전화번호에서 부분 문자열 추출 (1글자 부터 ~)
            if(map.has(number.slice(0,i))) { //만약 map에서 해당 전화번호를 찾으면 false
                return false;
            }
        }
    }
    
    return answer;
}