function solution(progresses, speeds) {
    var answer = [];
    let times = [];
    //각 progress가 완성되는데 걸리는 날짜(시간)를 계산해서 배열에 넣는다.
    progresses.forEach((progress, index) => {
        times.push(Math.ceil((100-progress)/speeds[index])); //올림처리
    });
    
    let maxTime = times[0]; //가장 오래 걸리는 time
    let count = 0; //하루에 같이 처리되는 progress의 개수
    
    times.forEach((time, index) => {
        if(maxTime >= time) { //만약 앞의 progress가 아직 안 끝난 상태라면
            count++; //한번에 처리할 양 +1
        }
        else { //앞의 progress가 끝난 상태면 
            answer.push(count); //한번에 처리해야할 progress 개수 넣기
            count = 1;//현재 progress부터 다시 시작하므로 1로 초기화
            maxTime = time; // 현재 progress가 걸리는 시간으로 max값 초기화
        }
    }) 
    answer.push(count); //마지막으로 한번에 처리할 양 넣기
    return answer;
}