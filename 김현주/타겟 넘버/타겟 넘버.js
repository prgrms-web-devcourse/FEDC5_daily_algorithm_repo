function dfs(numbers, target, sum, depth) {
    if(depth === numbers.length) { //만약 numbers 원소로 전부 조합해 봤을 때
        if(sum === target) { //타겟 넘버를 만들었으면
            return 1; //count++
        }
        return 0; //못 만들었으면 0개
    } 
    let count = 0;
    count += dfs(numbers, target, sum + numbers[depth], depth+1); // +
    count += dfs(numbers, target, sum - numbers[depth], depth+1); // -
    return count;
}

function solution(numbers, target) {
    return dfs(numbers, target, 0, 0)
}