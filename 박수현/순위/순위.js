function solution(n, results) {
  let answer = 0;
  const winGraph = [];
  const loseGraph = [];

  // 1. 이기는 방향 그래프, 지는 방향 그래프 만들기
  results.forEach((result) => {
    const x = result[0],
      y = result[1];
    if (winGraph[x]) {
      winGraph[x].push(y);
    } else {
      winGraph[x] = [y];
    }

    if (loseGraph[y]) {
      loseGraph[y].push(x);
    } else {
      loseGraph[y] = [x];
    }
  });

  // 2. 모든 선수에 대해 이기고 지는 값 구하기
  for (let i = 1; i <= n; i++) {
    // 3. 2번 값이 n-1ㅉ과 같다면 정답 증가
    if (bfs(winGraph, i) + bfs(loseGraph, i) === n - 1) {
      answer++;
    }
  }

  return answer;
}

function bfs(graph, start) {
  const queue = [start];
  const visited = [];
  visited[start] = true;
  let result = 0;

  while (queue.length > 0) {
    const current = queue.shift();
    for (const next of graph[current] || []) {
      if (visited[next] !== true) {
        visited[next] = true;
        queue.push(next);
        result++;
      }
    }
  }
  return result;
}
