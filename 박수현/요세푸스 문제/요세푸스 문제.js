const fs = require("fs");
const input = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `./input.txt`
)
  .trim()
  .split("\n");

const [n, k] = input.shift().split(" ").map(Number);
const answer = [];
const queue = [];

for (let i = 1; i <= n; i++) {
  queue.push(i);
}

let num = 1;

while (queue.length > 0) {
  const current = queue.shift();

  if (num % k === 0) {
    answer.push(current);
  } else {
    queue.push(current);
  }
  num += 1;
}

console.log(`<${answer.join(", ")}>`);
