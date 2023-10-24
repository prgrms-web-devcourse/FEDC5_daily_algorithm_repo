function solution(n, edge) {
  const visited = [1];
  const graph = new Array(n).fill().map(() => []);
  const queue = [];

  for ([x, y] of edge) {
    graph[x - 1].push(y - 1);
    graph[y - 1].push(x - 1);
  }

  queue.push(0);

  while (queue.length > 0) {
    const current = queue.shift();

    for (const next of graph[current]) {
      if (!visited[next]) {
        visited[next] = visited[current] + 1;
        queue.push(next);
      }
    }
  }

  const maxValue = Math.max(...visited);

  return visited.filter((item) => item === maxValue).length;
}
