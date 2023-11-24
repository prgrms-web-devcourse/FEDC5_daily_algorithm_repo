function solution(fees, records) {
    var answer = [];
    
    const carIn = new Map();
    const carParkingTime = new Map();
    let cars = [];
    
    records.forEach(record => {
        const [time, car, state] = record.split(' ');    
        if(state === 'IN') {
            carIn.set(car, time);
            cars.push(car);
        }
        else {
            let inTime = carIn.get(car);
            let outTime = time;
            carIn.delete(car);
            
            //주차된 시간 계산
            inTime = Number(inTime.substring(0,2)) * 60 + Number(inTime.substring(3,5));
            outTime = Number(outTime.substring(0,2)) * 60 + Number(outTime.substring(3,5));
            const parkingTime = outTime - inTime;
            carParkingTime.set(car, (carParkingTime.get(car)||0) + parkingTime);
        }
    })
    
    //끝까지 out 안한애들 23:59로 생각하고 계산
    const carInKeys = [...carIn.keys()];
    carInKeys.forEach(car => {
        let inTime = carIn.get(car);
        inTime = Number(inTime.substring(0,2)) * 60 + Number(inTime.substring(3,5));
        let outTime = 60 * 23 + 59
        const parkingTime = outTime - inTime;
        
        carParkingTime.set(car, (carParkingTime.get(car)||0) + parkingTime); 
    })
    

    //차량 번호가 작은 애부터 주차요금 계산
    cars.sort((a,b)=>a-b);
    
    cars = [...new Set(cars)]
    
    cars.forEach(car => {
        
        const parkingTime = carParkingTime.get(car);
        if(parkingTime <= fees[0]) {
            answer.push(fees[1])
        }
        else {
            answer.push(fees[1] + Math.ceil((parkingTime-fees[0]) / fees[2]) * fees[3]) 
        }
       
    })
    
    return answer;
}