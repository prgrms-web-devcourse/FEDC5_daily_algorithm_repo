const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split('\n');

const [N, M, R] = input[0].split(" ").map(Number)
const arr = input.slice(1,N+1).map(_ => _.trim().split(' ').map(Number));
const calculation = input[N+1].split(' ').map(Number)

function calculate1(inputArr) {
    const R = inputArr.length
    const C = inputArr[0].length
    const outputArr = Array.from({length:R}, ()=> new Array(C).fill(0));
    
    for(let r=0;r<R;r++) {
        for(let c=0;c<C;c++) {
            outputArr[r][c] = inputArr[R-r-1][c]
        }
    }

    return outputArr;
}

function calculate2(inputArr) {
    const R = inputArr.length
    const C = inputArr[0].length
    const outputArr = Array.from({length:R}, ()=> new Array(C).fill(0));
    
    for(let r=0;r<R;r++) {
        for(let c=0;c<C;c++) {
            outputArr[r][c] = inputArr[r][C-c-1]
        }
    }

    return outputArr;
}

function calculate3(inputArr) {
    const R = inputArr.length // 6
    const C = inputArr[0].length // 8
    const outputArr = Array.from({length:C}, ()=> new Array(R).fill(0));

    for(let r=0;r<C;r++) {
        for(let c=0;c<R;c++) {
            outputArr[r][c] = inputArr[R-c-1][r]
        }
    }

    return outputArr;
}

function calculate4(inputArr) {
    const R = inputArr.length
    const C = inputArr[0].length
    const outputArr = Array.from({length:C}, ()=> new Array(R).fill(0));
    
    for(let r=0;r<C;r++) {
        for(let c=0;c<R;c++) {
            outputArr[r][c] = inputArr[c][C-r-1]
        }
    }

    return outputArr;
}

function calculate5(inputArr) {
    const R = inputArr.length
    const C = inputArr[0].length
    const outputArr = Array.from({length:R}, ()=> new Array(C).fill(0));
    
    //4->1
    for(let r=0;r<R/2;r++) {
        for(let c=0;c<C/2;c++) {
            outputArr[r][c] = inputArr[R/2+r][c]
        }
    }
    //1->2
    for(let r=0;r<R/2;r++) {
        for(let c=0;c<C/2;c++) {
            outputArr[r][C/2+c] = inputArr[r][c]
        }
    }
    //2->3
    for(let r=0;r<R/2;r++) {
        for(let c=0;c<C/2;c++) {
            outputArr[R/2+r][C/2+c] = inputArr[r][C/2+c]
        }
    }
    //3->4
    for(let r=0;r<R/2;r++) {
        for(let c=0;c<C/2;c++) {
            outputArr[R/2+r][c] = inputArr[R/2+r][C/2+c]
        }
    }
    return outputArr;
}

function calculate6(inputArr) {
    const R = inputArr.length
    const C = inputArr[0].length
    const outputArr = Array.from({length:R}, ()=> new Array(C).fill(0));
    

    //1->4
    for(let r=0;r<R/2;r++) {
        for(let c=0;c<C/2;c++) {
            outputArr[R/2+r][c] = inputArr[r][c]
        }
    }
    //4->3
    for(let r=0;r<R/2;r++) {
        for(let c=0;c<C/2;c++) {
            outputArr[R/2+r][C/2+c] = inputArr[R/2+r][c]
        }
    }
    //3->2
    for(let r=0;r<R/2;r++) {
        for(let c=0;c<C/2;c++) {
            outputArr[r][C/2+c] = inputArr[R/2+r][C/2+c]
        }
    }
    //2->1
    for(let r=0;r<R/2;r++) {
        for(let c=0;c<C/2;c++) {
            outputArr[r][c] = inputArr[r][C/2+c]
        }
    }

    return outputArr;
}


function main() {
    let input = arr;
    calculation.forEach(calculationType => {   
        switch(calculationType) {
            case 1:
                input = calculate1(input)
                break;
            case 2:
                input = calculate2(input)
                break;
            case 3:
                input = calculate3(input)
                break;
            case 4:
                input = calculate4(input)
                break;
            case 5:
                input = calculate5(input)
                break;
            case 6:
                input = calculate6(input)
                break;
        }
    })

    input.forEach(row => {
        console.log(row.join(' '))
    }) 
}

main();