

function solution(gems) {
    var answer = [1, gems.length];
    //모든 종류.. set?map? 의 key로 넣고,
    //배열 돌면서 양쪽 포인터 사용?
    const count = new Set(gems).size;
    
    let left = 0, right = 0;
    
    const map = new Map();
    map.set(gems[0], 1);
    
    while(right < gems.length) {
        if(map.size === count) {
            if(answer[1]-answer[0] > right-left) {
                answer = [left+1, right+1];
            }
            map.set(gems[left], map.get(gems[left])-1);
            if(map.get(gems[left]) === 0) {
                map.delete(gems[left]);
            }
            left++;
        }
        else {
            right++;
            map.set(gems[right], (map.get(gems[right]) || 0) +1)
        } 
    }
    
    return answer;
}