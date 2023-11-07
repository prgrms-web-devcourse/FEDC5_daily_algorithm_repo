const fs = require("fs");
let input = (
    process.platform === "linux"
        ? fs.readFileSync("/dev/stdin").toString()
        : `3
        1 0 1
        1
        2 1`
).trim().split("\n").map(str => str.trim().split(" ").map(Number));

const [[switches], switchesStatus, [students], ...studentsStatus] = input;

for(const [gender, num] of studentsStatus) {
    if(gender == 1) {
        for(let i = num - 1; i < switches; i += num)
            switchesStatus[i] = switchesStatus[i] ? 0 : 1;
    } else {
        const i = num - 1;
        for(let j = 0; ;j++) {
            if(i - j >= 0 && i + j < switches && switchesStatus[i - j] == switchesStatus[i + j]) {
                switchesStatus[i - j] = switchesStatus[i - j] ? 0 : 1;
                switchesStatus[i + j] = switchesStatus[i - j];
            } else {
                break;
            }
        }
    }
}

for(let i = 0; i * 20 <= switches; i++) {
    console.log(switchesStatus.slice(20 * i, 20 * (i + 1)).join(" "));
}