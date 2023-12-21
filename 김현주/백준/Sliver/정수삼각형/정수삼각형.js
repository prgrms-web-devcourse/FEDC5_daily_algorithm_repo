const fs = require("fs");
const input = fs.readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt").toString().trim().split('\n')

//const [C, N] = input[0].split(" ").map(Number);
const N = Number(input[0]);

//const arr = input.slice(1).map(Number);
const map = input.slice(1).map(_ => _.trim().split(' ').map(Number));

function main() {
    for(let r=N-1;r>0;r--) {
        for(let c=0;c<map[r].length-1;c++) {
            map[r-1][c] = Math.max(map[r][c], map[r][c+1]) + map[r-1][c];
        }
    }
    console.log(map[0][0])
}

main();