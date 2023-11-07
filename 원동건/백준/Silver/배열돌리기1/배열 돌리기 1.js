const fs = require("fs");
let input = (
    process.platform === "linux"
        ? fs.readFileSync("/dev/stdin").toString()
        : `2 2 3
1 1
1 1`
).trim().split("\n");

const [[N, M, R], ...array] = input.map((s) => s.split(" ").map(Number));
const depthRange = Math.min(N, M) / 2;
const direction = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
];

function spinningArray(depth = 0) {
    if (depth === depthRange) return;
    
    for (let repeat = 0; repeat < R; repeat++) {
        let i = depth;
        let j = depth;
        let tmp = array[i][j];

        direction.forEach(([dirX, dirY]) => {
            do {
                do {
                    const privious = tmp;
                    i += dirY;
                    j += dirX;
                    tmp = array[i][j];
                    array[i][j] = privious;
                } while (j < M - 1 - depth && j > depth);
            } while (i < N - 1 - depth && i > depth);
        });
    }

    spinningArray(depth + 1);
}

spinningArray();

console.log(array.map(e => e.join(" ").trim()).join("\n").trim());
