function solution(begin, target, words) {
	// 1. 변경할 수 있는 단어 인지 체크합니다.
    let index = words.indexOf(target)
    if(index === -1) return 0;

    let answer = 0;
	// 2. 변경한 단어 체크 배열 생성합니다.    
    let ch = Array.from({length: words.length}, () => 0);
    
	// 3. queue에 시작 단어와 변경 횟수를 배열 형태로 넣어줍니다.
    let queue = [[begin, 0]];
    while(queue.length > 0) {
        let [value, index] = queue.shift();
        for(let i = 0; i < words.length; i++) {
			// 4. 한 글자만 다른지 체크합니다.
            let cnt = 0;
            for(let j = 0; j < words[i].length; j++) {
                if(words[i][j] !== value[j]) cnt++;
				// 5. 만약 두 글자 이상 다르다면 반복문을 종료합니다.
                if(cnt > 1) break;
            }
            
			// 6. 한 글자만 다르고, 아직 한 번도 변경하지 않은 경우를 체크합니다.
            if(cnt <= 1 && ch[i] === 0) {
				// 7. 변경할 단어와 변경 횟수를 1증가하여 queue에 담습니다.
                queue.push([words[i], index + 1]);
                ch[i] = index + 1;
            }
        }
    }
    
    return ch[index];
}