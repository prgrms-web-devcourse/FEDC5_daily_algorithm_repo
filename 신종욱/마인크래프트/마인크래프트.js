const input = require("fs")
    .readFileSync("/dev/stdin")
    .toString()
    .trim()
    .split("\n");

const [n, m, b] = input[0].split(" ").map(Number);
input.splice(0, 1);

const arr = input.map((row) => row.split(" ").map(Number));
let resultTime = Number.MAX_SAFE_INTEGER;
let resultHeight = -1;

for (let height = 0; height <= 256; height += 1) {
    let removeBlock = 0; // 제거할 블록 수
    let addBlock = 0; // 채워넣어야 할 블록 수

    for (let i = 0; i < n; i += 1) {
        for (let j = 0; j < m; j += 1) {
            if (arr[i][j] < height) {
                // 블록의 높이가 낮으므로 높이에 맞게 채워넣어야 할 블록 수
                addBlock += height - arr[i][j];
            } else {
                // 블록의 높이가 높으므로 높이에 맞게 제거해야 할 블록 수
                removeBlock += arr[i][j] - height;
            }
        }
    }

    if (removeBlock + b < addBlock) {
        // 블록 제거하면서 인벤토리에 저장한 블록 수 + 인벤토리 블록 수 < 필요로 하는 블록 수
        // 블록을 채워넣을 수 없으므로 break
        break;
    }

    const totalTime = removeBlock * 2 + addBlock;
    if (resultTime >= totalTime) {
        // 시간이 같으면 더 높은 높이로 갱신
        resultTime = totalTime;
        resultHeight = height;
    }
}
console.log(resultTime, resultHeight);
