const fs = require("fs");
let input = (
    process.platform === "linux"
        ? fs.readFileSync("/dev/stdin").toString()
        : `3 4
        c..c
        ..c.
        ....`
)
    .trim()
    .split("\n");

const area = input.slice(1).map((str) => str.trim().split(""));

const result = area.map((row) => {
    const copyRow = [...row].map((column) => (column == "c" ? 0 : -1));
    copyRow.forEach(
        (cur, i, arr) =>
            (arr[i] =
                arr[i - 1] !== undefined && arr[i - 1] >= 0 && cur < 0
                    ? arr[i - 1] + 1
                    : cur)
    );
    return copyRow;
});

while(result.length) {
    console.log(result.shift().join(" "));
}
