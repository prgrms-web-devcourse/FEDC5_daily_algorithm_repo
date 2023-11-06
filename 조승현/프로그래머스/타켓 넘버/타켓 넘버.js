function solution(numbers, target) {
    var answer = 0;

    function dfs(L, sum) {
        if(L === numbers.length) {
            if(sum === target) answer+=1;
            return
        }
        
        dfs(L+1, sum+numbers[L]);
        dfs(L+1, sum-numbers[L]);
    }
    dfs(0,0)
    return answer;
}