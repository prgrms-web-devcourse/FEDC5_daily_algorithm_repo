//순열 구하기
function getPermutations(arr, num) {
    const results = [];

    // nP1 이며, 1이면 의미 없기때문에 바로 반환한다.
    if (num === 1) return arr.map(v => [v]);

    arr.forEach((fixed, index, origin) => {
        // 순열에서는 조합과 달리 순서만 바뀌면 중복이 아니기때문에 기준값을 제외한 나머지 배열을 넣어준다.
        const rest = [...origin.slice(0, index), ...origin.slice(index + 1)];
        
        // 나머지 배열을 기준으로 다시 순열을 구한다.
        // 기준값(fixed)이 있기 때문에 선택하려는 개수에서 - 1 을 해준다.
        const permutations = getPermutations(rest, num - 1);

        // 기준값(fixed)에 순열(permutations)을 붙인다.
        const attached = permutations.map(v => [fixed, ...v]);

        // 붙인 값을 결과 값에 넣어준다.
        results.push(...attached);
    });

    return results;
}

function calculator(op1, op2, operator) {
    if(operator === '+') {
        return op1+op2;
    }
    else if(operator === '-') {
        return op1-op2;
    }
    else if(operator === '*') {
        return op1*op2;
    }
}

function solution(expression) {
    let answer = Number.MIN_SAFE_INTEGER;
    //연산자 종류
    const operatorTypes = [...new Set(expression.match(/[\*\+\-]/g))];     
    //연산자 우선순위 순열
    const operatorPriorities = getPermutations(operatorTypes, operatorTypes.length);
    
    //결과
    //- * - + (연산자)
    //항상 연산자가 피연산자보다 1개 적음
    
    //각 우선순위마다 구해보기
    operatorPriorities.forEach(operatorPriority => {
        const operands = expression.match(/[0-9]+/g).map(Number); // 피연산자
        const operators = expression.match(/[*+-]/g); // 연산자
        // 우선순위가 높은 연산자부터 계산
        operatorPriority.forEach(operator => { 
            let index = operators.indexOf(operator);
            while(index != -1) { // 연산자 다 쓸 때까지
                operands[index] = calculator(operands[index], operands[index+1], operator); // 앞 뒤 피연산자끼리 연산해서 앞 피연산자에 업데이트
                operands.splice(index+1, 1); //뒤에 피연산자를 삭제
                operators.splice(index, 1); //연산자도 삭제
                index = operators.indexOf(operator);
            }
        })
        const result = Math.abs(operands[0]);
        if(answer < result) {
            answer = result; //최댓값 업데이트
        }
        
        
    })
    
    
    
    return answer;
}