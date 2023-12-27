const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const [n, nums, operator] = input.map((row) => row.split(" ").map(Number));

let maxNum = Number.MIN_SAFE_INTEGER,
  minNum = Number.MAX_SAFE_INTEGER;

const calculator = [
  (a, b) => a + b,
  (a, b) => a - b,
  (a, b) => a * b,
  (a, b) => parseInt(a / b),
];

function dfs(depth, sum) {
  if (depth === n - 1) {
    maxNum = Math.max(maxNum, sum);
    minNum = Math.min(minNum, sum);
    return;
  }
  for (let i = 0; i < operator.length; i++) {
    if (operator[i] > 0) {
      operator[i]--;
      dfs(depth + 1, calculator[i](sum, nums[depth + 1]));
      operator[i]++;
    }
  }
}

dfs(0, nums[0]);

console.log(maxNum === 0 ? 0 : maxNum);
console.log(minNum === 0 ? 0 : minNum);
