/*
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
*/
const input = require('fs').readFileSync('dev/stdin').toString().trim().split('\n');

const N = Number(input[0])
const switches = input[1].split(' ').map(Number);
const students = input.slice(3).map(_=>_.trim().split(' ').map(Number))

const MALE = 1;
const FEMALE = 2;

function maleStudent(num) {
    let pos = num;
    let i = 1;
    while(pos <= N) {
        switches[pos-1] = switches[pos-1] === 1 ? 0 : 1;
        pos = num*++i;
    }
}

function femaleStudent(num) {
    let pos = num;
    let i = 1;
    switches[pos-1] = switches[pos-1] === 1 ? 0 : 1;
    while(pos-i-1 >= 0 && pos+i-1 < N) {
        if(switches[pos-i-1] !== switches[pos+i-1]) {
            break;
        }
        switches[pos-i-1] = switches[pos-i-1] === 1 ? 0 : 1;
        switches[pos+i-1] = switches[pos+i-1] === 1 ? 0 : 1;
        i++;
    }

}

function main() {
   students.forEach(([studentType, num]) => {
        switch(studentType) {
            case MALE:
                maleStudent(num)
                break;
            case FEMALE:
                femaleStudent(num);
                break;
        }
   })

   let result = [];
    while (switches.length > 0) {
      result.push(switches.splice(0, 20).join(" "));
    }
    console.log(result.join("\n"));
}

main();