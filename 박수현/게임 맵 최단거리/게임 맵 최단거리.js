class Queue {
  constructor() {
    this.queue = [];
    this.front = 0;
    this.rear = 0;
  }

  enqueue(value) {
    this.queue[this.rear++] = value;
  }

  dequeue() {
    const value = this.queue[this.front];
    delete this.queue[this.front];
    this.front++;

    return value;
  }

  size() {
    return this.rear - this.front;
  }
}
function solution(maps) {
  const n = maps.length,
    m = maps[0].length;

  const dx = [-1, 1, 0, 0],
    dy = [0, 0, -1, 1];

  const queue = [[0, 0, 1]];

  while (queue.length) {
    const item = queue.shift();
    const x = item[0],
      y = item[1],
      cnt = item[2];

    if (x === n - 1 && y === m - 1) {
      return cnt;
    }

    for (let i = 0; i < 4; i++) {
      const nx = dx[i] + x,
        ny = dy[i] + y;

      if (nx > -1 && ny > -1 && nx < n && ny < m && maps[nx][ny]) {
        maps[nx][ny] = 0;
        queue.push([nx, ny, cnt + 1]);
      }
    }
  }
  return -1;
}
