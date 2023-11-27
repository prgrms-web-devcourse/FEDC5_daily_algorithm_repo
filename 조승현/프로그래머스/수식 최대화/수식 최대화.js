function solution(expression) {
    // 최댓값을 구해야 하기 때문에 가장 작은 수로 answer를 설정했습니다.
    let answer = Number.MIN_SAFE_INTEGER;

    // 빼기 기호를 문자열 'm'으로 변환하여 시작했습니다.
    expression = expression.replaceAll('-', 'm');

    // 탐색이 필요한 배열의 우선순위를 dfs를 사용하여 구하고 시작했습니다.
    // (미리 배열을 만들어 놓고 시작할 수도 있겠지만, 수식이 더 많을때도 풀 수 있도록..?) 
    let calculator = ["*", "+", "m"]
    let calcArr = [];
    let ch = Array.from({length: calculator.length }, () => 0)
    function dfs(L, list) {
        if(L === calculator.length) {
            calcArr.push(list.split(''));
        } else {
            for(let i = 0; i < calculator.length; i++) {
                if(ch[i] === 0) {
                    ch[i] = 1;
                    dfs(L+1, list+calculator[i]);
                    ch[i] = 0;
                }
            }
        }
    }
    dfs(0, '')

    // 완탐으로 구한 연산자 우선순위 배열을 순회합니다.
    calcArr.forEach(sign => {
        // 우선순위 마다 계산을 다시해야하기 때문에 복사 수식을 만들어줬습니다.
        let copyExpression = expression;
        sign.forEach(a => {
            let index = copyExpression.indexOf(a);
            while(index > -1) {
                // 기호의 앞 숫자 구하기
                let front = ""
                for(let i = index - 1; i >= 0 ; i--) {
                    // 숫자인 경우 index의 앞 숫자를 더해준다.
                    if(!isNaN(copyExpression[i])) {
                        front = copyExpression[i] + front;
                    } else if(copyExpression[i] === '-') {
                    // 음수인 경우 -까지 더해준다.
                        front = Number(-front);
                    } else {
                        break;
                    }
                }

                let back = ""
                // 기호의 뒤 숫자 구하기
                for(let i = index + 1; i < copyExpression.length; i++) {
                    // 숫자거나 음수(-)인 경우를 모두 구해준다.
                    if(!isNaN(copyExpression[i]) || copyExpression[i] === '-') {
                        back += copyExpression[i];
                    } else {
                        break;
                    }
                }

                // 연산 기호에 맞게 계산한 값을 expression에 바꿔준다.
                if(a === '*') {
                    const calc = Number(front) * Number(back);
                    const calcStr = front + '*' + back;
                    copyExpression = copyExpression.replaceAll(calcStr, calc);
                } else if(a === 'm') {
                    const calc = Number(front) - Number(back);
                    const calcStr = front + 'm' + back;
                    copyExpression = copyExpression.replaceAll(calcStr, calc);
                } else if(a === '+') {
                    const calc = Number(front) + Number(back);
                    const calcStr = front + '+' + back;
                    copyExpression = copyExpression.replaceAll(calcStr, calc);
                }

                // 찾으려는 수식이 더 있는지 체크한다.
                index = copyExpression.indexOf(a, 1);
            }
        })
        // 최댓값을 구한다.
        answer = Math.max(answer, Math.abs(copyExpression));
    })


    return answer;
}