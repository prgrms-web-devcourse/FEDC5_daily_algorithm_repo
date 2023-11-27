function solution(gems) {
    const gemType = new Set(gems);
    const map = new Map();
    
    let result = Number.MAX_SAFE_INTEGER;
    let start,end;
     
    gems.forEach((gem, index) => {
        if(map.has(gem)) map.delete(gem);
        map.set(gem, index + 1);
        if(gemType.size === map.size) {
            let firstValue = map.values().next().value;
            if(result > index + 1 - firstValue) {
                result = index + 1 - firstValue;
                start = firstValue;
                end = index + 1
            }
        }
    })
    
    return [start, end]
}