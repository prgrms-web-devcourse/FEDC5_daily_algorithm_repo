function solution(fees, records) {
    // fees
    // [0]: 기본 시간(분)
    // [1]: 기본 요금(원)
    // [2]: 단위 시간(분)
    // [3]: 단위 요금(원)
    
    // records
    // [0]: 시각
    // [1]: 차량번호
    // [2]: 내역 (IN / OUT)
    const answer = [];
    const [basicTime, basicMoney, addTime, addMoney] = fees;
    
    const map = new Map();
    const allTime = new Map();
    
    records.forEach((record) => {
        record = record.split(' ')
        const time = record[0];
        const num = record[1];
        const input = record[2];
        
        if(input === 'IN') {
            map.set(num, time);
        } else if(input === 'OUT') {
            const [inHours, inMins] = map.get(num).split(':').map(Number);
            const [outHours, outMins] = time.split(':').map(Number);
            map.delete(num);
            const inTime = inHours * 60 + inMins;
            const outTime = outHours * 60 + outMins
            const calc = outTime - inTime;
            if(allTime.has(num)) {
                allTime.set(num, allTime.get(num) + calc)
            } else {
                allTime.set(num, calc)
            }
        }
    })
    
    for(const [num, time] of map) {
        const [inHours, inMins] = map.get(num).split(':').map(Number);
        const inTime = inHours * 60 + inMins;
        const calc = (60*23 + 59) - inTime;
        
        if(allTime.has(num)) {
            allTime.set(num, allTime.get(num) + calc);
        } else {
            allTime.set(num, calc)
        }
    }
    
    [...allTime.keys()].sort((a, b) => Number(a) - Number(b)).
    forEach(car => {
        const time = allTime.get(car);
        if(time <= basicTime) {
            answer.push(basicMoney);
        } else {
            const money = Math.ceil((time - basicTime) / addTime) * addMoney
            answer.push(money + basicMoney);
        }
    })
    
    return answer;
}