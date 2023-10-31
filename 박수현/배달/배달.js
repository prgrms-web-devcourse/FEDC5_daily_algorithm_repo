function solution(N, road, K) {
  const graph = Array.from({ length: N + 1 }, () => Array());
  const distance = Array(N + 1).fill(Infinity);

  const queue = [];

  road.forEach((eachRoad) => {
    const [start, target, cost] = eachRoad;
    graph[start].push([target, cost]);
    graph[target].push([start, cost]);
  });

  queue.push([1, 0]);
  distance[1] = 0;

  while (queue.length > 0) {
    const [current, cost] = queue.shift();

    graph[current].forEach((eachGraph) => {
      const [next, nextCost] = eachGraph;

      if (distance[next] > distance[current] + nextCost) {
        distance[next] = distance[current] + nextCost;
        queue.push([next, nextCost]);
      }
    });
  }

  return distance.filter((item) => item <= K).length;
}
