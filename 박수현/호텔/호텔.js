const MAX = 100 * 1000;

const fs = require("fs");
const input = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `./input.txt`
)
  .trim()
  .split("\n");

const [c] = input.shift().split(" ").map(Number);
const costs = input.map((row) => row.split(" ").map(Number));
const dp = Array.from({ length: MAX + 1 }, () => 0);

const answer = [];

function checkCost(total_cost) {
  if (dp[total_cost] >= c) {
    answer.push(total_cost);
    return;
  }

  costs.forEach(([cost, customer]) => {
    if (dp[total_cost] + customer > dp[total_cost + cost]) {
      dp[total_cost + cost] = dp[total_cost] + customer;
      checkCost(total_cost + cost);
    }
  });
}

checkCost(0);

console.log(Math.min(...answer));
