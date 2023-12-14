
const fs = require("fs");
const input = fs.readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt").toString().trim().split('\n')

const [N, K] = input[0].split(" ").map(Number);
//const N = Number(input[0]);

//const arr = input.slice(1).map(Number);
//const map = input.slice(1).map(_ => _.trim().split(' ').map(Number));

function main() {
    const answer = [];
    const queue = [];
    for(let i=0;i<N;i++) {
        queue.push(i+1);
    }

    let index = 1;
    while(answer.length < N) {
        const el = queue.shift();
        if(index % K === 0) {
            answer.push(el);
        }
        else {
            queue.push(el)
        }
        index++;
    }

    console.log(`<${answer.join(', ')}>`)
    
}

main();