function checkMap(str, map) {
    for(let i = 0; i < str.length - 1; i++) {
        let char1 = str[i].charCodeAt();
        let char2 = str[i+1].charCodeAt();
        // A - 65, Z - 90
        if(char1 >= 65 && char1 <= 90 
           && char2 >= 65 && char2 <= 90) {
            // 영문자 성립
            let char = str[i] + str[i+1];
            map.set(char, (map.get(char) || 0) + 1);
        }
    }
}

function solution(str1, str2) {
    // 들어온 문자열을 대문자로 통일 시켜줍니다.
    str1 = str1.toUpperCase();
    str2 = str2.toUpperCase();
    
    // 글자쌍을 저장할 map 데이터를 생성합니다.
    let map1 = new Map();
    let map2 = new Map();
    
    // 두글짜 씩 끊을 수 있는지 유효성 검사
    checkMap(str1, map1);
    checkMap(str2, map2);
    
    // 공집합 검사
    if(map1.size === 0 && map2.size === 0) return 65536;
    
    let common = 0; // 공집합 개수
    let sum = 0; // 합집합 개수
    
    for(let [key,val] of map1) {
        if(map2.has(key)) {
						// 서로 같고 더 작은수가 교집합
            common += Math.min(map2.get(key), val);
						// 서로 같지만 더 큰수가 합집합
            sum += Math.max(map2.get(key), val);
            map1.delete(key);
            map2.delete(key);
        } else {
            sum += val;
        }
    }
    
    for(let [key,val] of map2) {
				// 남은 겂 => 합집합에 더해준다.
        sum += val;
    }
    
    return Math.floor((common / sum) * 65536)
}