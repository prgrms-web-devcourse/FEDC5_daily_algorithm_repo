function solution(clothes) {
    const hashMap = new Map();
    
    clothes.forEach(([_, source]) => 
                    hashMap.set(source, 
	                    (hashMap.get(source) || 0) + 1))
    
    return [...hashMap.values()]
	        .reduce((acc, cur) => 
		        acc * (cur + 1), 1) - 1;
}