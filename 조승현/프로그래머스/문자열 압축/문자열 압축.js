function solution(s) {
    let answer = s.length;
    
	// 문자의 길이
    let count = 1;
    while(count <= s.length) {
        let cnt = 1; // 중복 문자 카운트
        let str = s.slice(0, count); // 초기 문자 세팅
        let result = ""; // 누적 문자열
        
        for(let i = 1; i < s.length ; i++) {
			// 찾을 문자의 길이만큼 끊기
            let currentStr = count === 1 ? s.slice(i, i + 1) 
            : s.slice(count * i, count * (i+1));
		
			// 찾을 문자의 길이가 s의 길이보다 크면 지금까지 남은 글자를 result에 넣고 반복문 종료
            if(count*(i+1) > s.length) {
                result += currentStr;
                break;
            }

			// 문자열 비교 하는 조건문
            if(str === currentStr) {
				// 같다면 문자열 카운트만 증가
                cnt++;
            }  else {
				// 다르다면 현재 카운트에 따라 result에 문자열 추가
                if(cnt === 1) {
                    result += str;
                } else {
                    result += cnt + str;
                }

				// 찾을 문자열 변경해주기
                str = currentStr;
                cnt = 1;
            }
        }
        
		// 마지막까지 비교 후 남은 문자열 넣어주는 코드
        if(cnt === 1) result += str;
        else result += cnt + str;

        answer = Math.min(answer, result.length);
        count++;
    } 
    return answer;
}