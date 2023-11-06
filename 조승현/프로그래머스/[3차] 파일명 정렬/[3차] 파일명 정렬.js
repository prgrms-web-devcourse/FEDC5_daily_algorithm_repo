// HEAD : 문자만 들어올 수 있음 (숫자 나온 후로 접근 불가)
// NUMBER : 숫자만 들어올 수 있음(숫자가 아닌 값이 나온 후로 접근 불가)
// TAIL : HEAD, NUMBER 접근 불가 시 TAIL에 남은 문자 담기

function solution(files) {
    let answer = [];
    
    files.forEach(file => {
				// 1. 파일명으로 분류
        let HEAD = '';
        let NUMBER = '';
        let TAIL = '';
        
				// 2. 접근 가능 여부 flag 변수 처리
        let flag = [true,true];

        for(const char of file) {
            if(flag[0] && (isNaN(char) || char === ' ')) {
								// 문자만 O / 숫자가 나온 후로는 접근 불가
                HEAD += char;
            } else if(flag[1] && !isNaN(char) && char !== ' ' && NUMBER.length < 5) {
                // 숫자만 O / 숫자가 아닌 값이 나오면 접근 불가
								flag[0] = false;
                NUMBER += char;
            } else {
								// HEAD, NUMBER 접근 불가 시 모든 문자열 담기
                flag[1] = false;
                TAIL += char;
            }
        }
        
        answer.push([HEAD, NUMBER, TAIL]);
    })
    
		// 3. 파일명으로 정렬하기
    answer.sort((a,b) => {
				// HEAD 기준으로 정렬(대소문자 구분 없음)
        if(a[0].toUpperCase() === b[0].toUpperCase()) {
						// NUMBER 기준으로 정렬(숫자형으로 변환 후)
            if(Number(a[1]) !== Number(b[1])) {
                return Number(a[1]) - Number(b[1])
            }
        } else {
            if(a[0].toUpperCase() > b[0].toUpperCase()) return 1;
            else return -1
        }
    })
    
		// 4. 정렬한 파일명 join()로 붙여서 1차원 배열로 만들기
    return answer.map(files => files.join(''));
}