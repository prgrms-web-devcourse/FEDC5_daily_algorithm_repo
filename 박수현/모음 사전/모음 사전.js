function solution(word) {
  let answer = [];

  const word_list = ["A", "E", "I", "O", "U"];
  const word_len = word_list.length;

  function dfs(current, depth) {
    if (depth === word_len) return;

    answer.push(current);

    for (words of word_list) {
      dfs(current + words, depth + 1);
    }
  }

  for (words of word_list) {
    dfs(words, 0);
  }

  return answer.findIndex((item) => item === word) + 1;
}
