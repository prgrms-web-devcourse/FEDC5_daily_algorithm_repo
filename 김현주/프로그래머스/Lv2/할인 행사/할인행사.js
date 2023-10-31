function solution(want, number, discount) {
    var answer = 0;

    let left =0;
    let right=10;
    const map = new Map();

    for(let i=0;i<=discount.length-10;i++) {
        if(i==0){ //처음에만 0~10범위 부분리스트를 map으로 만들어준다.
            let list = discount.slice(i,i+10);
            list.forEach(item=>map.set(item,(map.get(item)||0)+1));
        }
        else { //맨 앞 요소 삭제, 맨 뒤 요소 추가
            map.set(discount[left], map.get(discount[left])-1);
            map.set(discount[right], (map.get(discount[right])||0)+1);
            right++;
            left++;
        }

        let check = true;
        for(let j = 0; j < want.length; j++){
            //만약 물품의 개수가 일치하지 않는다면
            if(map.get(want[j])!=number[j]) {
                check = false;
                break;
            }
        }
        if(check) answer++;  // 일치하면 정답
    }
    return answer;
}
