function solution(begin, target, words) {
  let visited = { [begin]: 0 };
  const queue = [begin];

  while (queue.length) {
    const cur = queue.shift();

    if (cur === target) break;

    for (let i = 0; i < words.length; i += 1) {
      const word = words[i];
      if (isConnected(word, cur) && !visited[word]) {
        visited[word] = visited[cur] + 1;
        queue.push(word);
      }
    }
  }
  return visited[target] ? visited[target] : 0;
}

function isConnected(word, cur) {
  let count = 0;
  const len = word.length;

  for (let i = 0; i < len; i += 1) {
    if (word[i] !== cur[i]) count++;
  }

  return count === 1 ? true : false;
}
