
const fs = require("fs");
const input = fs.readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt").toString().trim().split('\n')

const [C, N] = input[0].split(" ").map(Number);
//const N = Number(input[0]);

//const arr = input.slice(1).map(Number);
const map = input.slice(1).map(_ => _.trim().split(' ').map(Number));

function main() {
    //c명 늘리기 위해
    //홍보비용, 고객의 수

    //dp[i] = v // i명을 늘릴 때 드는 최소 비용
    const dp = Array.from({length:C+101}, () => Infinity)
    
    //초기 비용 0 설정
    dp[0] = 0;
    //1~minPeople : 채울 수 있는 가장 작은 값은 해당 cost
    
    let minCost=0, minPeople=Infinity;
    map.map(([cost, people]) => {
        if(minPeople > people) {
            minCost = cost;
            minPeople = people;
        }
    })
    for(let i=1;i<minPeople;i++) {
        dp[i] = minCost
    }
   
    map.forEach(([cost, people]) => {
        for(let i=people;i<=C+100;i++) {
            dp[i] = Math.min(dp[i-people]+cost, dp[i]);
        }
    })
    //console.log(dp)
    //console.log(dp.slice(C))
    console.log(Math.min(...dp.slice(C))) //C~C+100사이에 10명일때 최소 dp[10] = 20 dp[15] = 10
}

main();