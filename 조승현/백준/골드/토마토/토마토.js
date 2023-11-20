const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [[col, row], ...tomato] = input.map(v => v.split(' ').map(Number))


class Queue {
    constructor() {
        this.queue = [];
        this.front = 0;
        this.rear = 0;
    }

    enqueue(value) {
        this.queue[this.rear++] = value;
    }

    dequeue() {
        const value = this.queue[this.front];
        delete this.queue[this.front++]
        return value;
    }
    size() {
        return this.rear - this.front;
    }
}

function solution(tomato,row,col) {
    let answer = -1;
    const dx = [-1,0,1,0];
    const dy = [0,1,0,-1];
    
    if(tomato.every(t => !t.includes(0))) return 0;
    
    const queue = new Queue();
    
    for(let i = 0; i < row; i++) {
        for(let j = 0; j < col; j++) {
            if(tomato[i][j] === 1) {
                queue.enqueue([i, j, 0]);
            }
        }
    }
    
    
    while(queue.size() > 0) {
        const [x, y, d] = queue.dequeue();
        for(let k = 0 ; k < 4; k++) {
            const nx = x + dx[k];
            const ny = y + dy[k];
            
            if(nx >= 0 && ny >= 0 && nx < row && ny < col && tomato[nx][ny] === 0) {
                tomato[nx][ny] = 1;
                queue.enqueue([nx, ny, d+1]);
                answer = Math.max(answer, d+1);
            }
        }
    }
    
    if(tomato.some(t => t.includes(0))) {
        return -1;
    } 
    
    return answer;
}

console.log(solution(tomato,row,col));