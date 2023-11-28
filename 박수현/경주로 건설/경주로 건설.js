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
    if (this.size()) {
      const value = this.queue[this.front];
      delete this.queue[this.front++];
      return value;
    }
  }

  size() {
    return this.rear - this.front;
  }
}

function getDirection(x, y, nextX, nextY) {
  // 상하
  if (x === nextX) {
    if (y < nextY) {
      return 0;
    } else {
      return 1;
    }
  }

  // 좌우
  if (y === nextY) {
    if (x > nextX) {
      return 3;
    } else {
      return 4;
    }
  }
}

function solution(board) {
  let answer = Infinity;

  const dx = [1, -1, 0, 0];
  const dy = [0, 0, 1, -1];

  const n = board.length;
  const visited = Array.from({ length: n }, () =>
    Array.from({ length: n }, () => Array(4).fill(0))
  );

  const queue = new Queue();
  queue.enqueue([0, 0, null, 0]);

  while (queue.size() > 0) {
    const [x, y, prevDir, prevCost] = queue.dequeue();

    if (x === n - 1 && y === n - 1) {
      answer = prevCost < answer ? prevCost : answer;
    }

    for (let i = 0; i < 4; i++) {
      const nextX = x + dx[i],
        nextY = y + dy[i];

      if (nextX >= n || nextY >= n || nextX < 0 || nextY < 0) {
        continue;
      }

      if (board[nextX][nextY] === 1) {
        continue;
      }

      const dir = getDirection(x, y, nextX, nextY);

      const cost =
        prevDir === null || prevDir === dir ? prevCost + 100 : prevCost + 600;

      if (!visited[nextX][nextY][dir] || visited[nextX][nextY][dir] >= cost) {
        visited[nextX][nextY][dir] = cost;
        queue.enqueue([nextX, nextY, dir, cost]);
      }
    }
  }
  return answer;
}
