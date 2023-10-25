class Queue {
  constructor() {
    this.queue = [];
    this.rear = 0;
    this.front = 0;
  }
  push(value) {
    this.queue.push(value);
    this.rear++;
  }
  pop() {
    const value = this.queue[this.front];
    delete this.queue[this.front];
    this.front++;
    return value;
  }
  size() {
    return this.rear - this.front;
  }
}

function solution(n, computers) {
  let answer = 0;
  let visited = [];

  for (let i = 0; i < n; i += 1) {
    if (!visited[i]) {
      bfs(i, visited, computers);
      answer += 1;
    }
  }
  return answer;
}

function bfs(node, visited, computers) {
  visited[node] = true;
  const queue = new Queue();
  queue.push(node);

  while (queue.size() > 0) {
    const idx = queue.pop();
    visited[idx] = true;

    for (let i = 0; i < computers.length; i += 1) {
      if (!visited[i] && computers[idx][i]) {
        queue.push(i);
      }
    }
  }
}
