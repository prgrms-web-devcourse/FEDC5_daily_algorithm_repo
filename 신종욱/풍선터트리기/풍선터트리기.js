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
    this.queue = this.queue.splice(this.front,1);
    this.front++;
    return value;
  }

  size() {
    return this.rear - this.front;
  }
}

const input = require('fs')
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n');

const n = Number(input[0]);
let balloons = input[1].split(' ').map(Number);
const que = new Queue();
const objects = {};
balloons.forEach((val, idx) => {
  objects[val] = idx + 1;
  que.enqueue(val);
});

const result = [1];
// let dir = balloons.shift();
let dir = que.dequeue();

while (
  // balloons.length > 0
  que.size() > 0
) {
  if (dir > 0) {
    for (let i = 0; i < dir - 1; i++) {
      // balloons.push(balloons.shift());
      que.enqueue(que.dequeue());
    }
  } else if (dir < 0) {
    for (let i = 0; i < -dir; i++) {
      // balloons.unshift(balloons.pop());
      que.queue.unshift(que.queue.pop());
    }
  }
  // dir = balloons.shift();
  dir = que.dequeue();
  result.push(objects[dir]);
}

console.log(result.join(' '));
