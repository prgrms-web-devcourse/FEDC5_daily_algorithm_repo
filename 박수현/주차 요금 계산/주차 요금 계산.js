function calculate_min_time(time1, time2) {
  const [hour1, min1] = time1.split(":").map(Number);
  const [hour2, min2] = time2.split(":").map(Number);

  return (hour2 - hour1) * 60 + min2 - min1;
}

function calculate_pay(time, fees) {
  const [base_time, base_pay, per_time, per_pay] = fees;

  // 5. base_time 기준으로 요금 구하기
  if (time <= base_time) {
    return base_pay;
  } else {
    const exceed_time = time - base_time;
    return base_pay + Math.ceil(exceed_time / per_time) * per_pay;
  }
}

function solution(fees, records) {
  let answer = [];
  let car_record = new Map();

  // 1. { "차량번호" : [ 입출차 시간들.. ]} 이런 Map 형태로 저장
  records.forEach((record) => {
    const [time, car_num] = record.split(" ");
    if (car_record.has(car_num)) {
      car_record.set(car_num, [...car_record.get(car_num), time]);
    } else {
      car_record.set(car_num, [time]);
    }
  });

  // 2. 차량 번호 순서대로 정렬
  car_record = new Map([...car_record.entries()].sort());

  for (let [, times] of car_record) {
    let pay = 0;
    let total_time = 0;

    // 3. 만약 시간 배열의 길이가 홀수라면 출차 시간이 안 들어온 것, "23:59" 추가해주기
    if (times.length % 2 !== 0) {
      times.push("23:59");
    }

    // 4. 시간 배열을 돌면서 총 시간 구하기
    for (let i = 0; i < times.length; i += 2) {
      total_time += calculate_min_time(times[i], times[i + 1], fees);
    }
    pay = calculate_pay(total_time, fees);
    answer.push(pay);
  }

  return answer;
}
