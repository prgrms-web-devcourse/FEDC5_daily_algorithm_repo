function solution(cacheSize, cities) {
    //만약 캐시 용량이 0이라면? 
    if(cacheSize === 0) {
        return 5*cities.length;
    }
    
    let answer = 0;
    let cache = [];
    
    for(let city of cities) {
        //대소문자 구분 안하므로 통일
        city = city.toLowerCase();
        
        // 1. cache hit
        if(cache.includes(city)) {
            //순서 갱신
            cache.splice(cache.indexOf(city), 1); // 삭제하고
            cache.push(city); // 맨 뒤에 다시 넣기
            answer+=1;
        }
        
        // 2. cache miss
        else {
            //캐시 용량이 꽉 차있으면
            if(cache.length === cacheSize) {
                cache.shift(); // 가장 오래된 것 삭제
            }
            cache.push(city); // 맨 뒤에 넣기
            answer+=5;
        }
    }
    return answer;
}
