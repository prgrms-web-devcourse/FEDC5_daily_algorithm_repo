const input = require("fs")
    .readFileSync("/dev/stdin")
    .toString()
    .trim()
    .split("\n");

const [n, m] = input.slice[0].split(" ").map(Number);
const graph = Array.from({ length: n + 1 }, () => []);
let maxWeight = 0;

input.slice(1, m + 1).forEach((row) => {
    // 양방향 그래프
    const [a, b, c] = row.split(" ").map(Number);
    graph[a].push([b, c]);
    graph[b].push([a, c]);
    maxWeight = Math.max(maxWeight, c);
});

// 시작 지점과 도착 지점
const [start, end] = input[m + 1].split(" ").map(Number);

binarySearch(n, graph, start, end, maxWeight);

function binarySearch(n, graph, start, end, maxWeight) {
    let left = 1;
    let right = maxWeight;

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (bfs(n, graph, start, end, mid)) {
            // 섬에 도착했다면 중량 최댓값 늘리기
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    console.log(right);
}

function bfs(n, graph, start, end, mid) {
    const queue = [];
    const visited = Array.from({ length: n + 1 }, () => false);
    queue.push(start);
    visited[start] = true;

    while (queue.length > 0) {
        const island = queue.shift();
        if (island === end) return true; // 목적지에 도착했다면 true 반환

        for (let idx = 0; idx < graph[island].length; idx += 1) {
            const nextIsland = graph[island][idx][0];
            const nextWeight = graph[island][idx][1];
            if (!visited[nextIsland] && mid <= nextWeight) {
                // 방문하지 않았고 중량 제한을 통과했다면
                visited[nextIsland] = true;
                queue.push(nextIsland);
            }
        }
    }
    return false; // 목적지에 도착 못했으므로 false 반환
}
