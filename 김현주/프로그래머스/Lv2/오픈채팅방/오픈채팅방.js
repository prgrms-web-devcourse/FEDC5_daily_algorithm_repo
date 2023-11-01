function solution(record) {
    var answer = [];
    
    //같은 아이디의 사람이 나갔다가 다른 닉네임으로 들어오면 닉네임 다 새거로 변경
    //이름 바꾸면(Change) 같은 아이디들 전부 바꾸기
    
    const splitRecord = record.map(string => string.split(" "));
    
    const map = new Map(); // [userID, userName]
    
    //map에 [userID, userName] 계속 업데이트 해주며 저장
    splitRecord.forEach((record) => {
        const message = record[0];
        const userID = record[1];
        const userName = record[2];
        
        if (message === 'Leave') {
            return false;
        }
        
        map.set(userID, userName); // 마지막 userName으로 덮어쓰기
    })
    
    //result 출력
    splitRecord.forEach((record) => {
        const message = record[0];
        const userID = record[1];
        const userName = map.get(userID); //userID의 최종 닉네임으로 출력
        
        let string;
        switch(message) {
            case 'Enter':
                string = `${userName}님이 들어왔습니다.`;
                answer.push(string);
                break;
            case 'Leave':
                string = `${userName}님이 나갔습니다.`;
                answer.push(string);
                break;
        }
    })
    
    return answer;
}