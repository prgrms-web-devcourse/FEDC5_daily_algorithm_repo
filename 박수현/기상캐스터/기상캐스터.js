const fs = require("fs");
const input = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `input.txt`
)
  .trim()
  .split("\n");

const [h, w] = input.shift().split(" ").map(Number);
const board = input;
const result = [];

for (let row = 0; row < h; row++) {
  let cloud = -1;
  const rowResult = [];

  for (let col = 0; col < w; col++) {
    if (board[row][col] === "c") {
      rowResult.push(0);
      cloud = col;
    } else {
      rowResult.push(cloud === -1 ? -1 : col - cloud);
    }
  }

  result.push(rowResult);
}

result.map((row) => {
  console.log(row.join(" "));
});
