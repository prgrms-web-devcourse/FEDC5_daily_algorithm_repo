function divide(str) {
    const set = [];
    for(let i = 0; i < str.length - 1; i++) {
        const word = str.slice(i, i+2);
        if((/[a-z]{2}/).test(word)) {
            set.push(word);
        }
    }
    return set;
}

function solution(str1, str2) {
    const set1 = divide(str1.toLowerCase());
    const set2 = divide(str2.toLowerCase());
    const hashMap = new Map();
    const 교집합 = new Map();
    const 합집합 = new Map();
    
    for(const set of set1) {    // 해시 초기화 => Map 깊은 복사 구현 어려워서 같이 초기화
        if(hashMap.has(set)) {
            hashMap.set(set, hashMap.get(set) + 1);
            합집합.set(set, 합집합.get(set) + 1);
        } else {
            hashMap.set(set, 1);
            합집합.set(set, 1);
        }
    }
    
    for(const set of set2) {   // 
        if(hashMap.has(set) && hashMap.get(set) > 0) {
            교집합.set(set, (교집합.get(set) || 0) + 1);
        }
        if(hashMap.get(set) <= 0 || !hashMap.has(set)) {
            합집합.set(set, (합집합.get(set) || 0) + 1);
        }
        if(hashMap.has(set)) {
            hashMap.set(set, hashMap.get(set) - 1);
        }
    }
    
    const 교집합개수 = [...교집합.values()].reduce((acc, cur) => acc + cur, 0);
    const 합집합개수 = [...합집합.values()].reduce((acc, cur) => acc + cur, 0);
    
    if(합집합개수 <= 0) {
        return 65536;
    }
    
    return ~~((교집합개수 / 합집합개수) * 65536)
}