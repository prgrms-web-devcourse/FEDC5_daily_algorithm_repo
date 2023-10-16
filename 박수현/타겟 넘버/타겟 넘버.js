function solution(numbers, target) {
  let answer = 0;
  const max_len = numbers.length;

  function dfs(depth, count) {
    if (depth === max_len) {
      if (count === target) {
        answer += 1;
      }
      return;
    }

    dfs(depth + 1, count + numbers[depth]);
    dfs(depth + 1, count - numbers[depth]);
  }

  dfs(0, 0);

  return answer;
}
