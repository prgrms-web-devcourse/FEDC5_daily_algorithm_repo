function solution(arr) {
    const answer = [0,0];
    const n = arr.length;
    
		// n이 1이 될 떄까지 반복한다.
    function recur(x,y,n) {
        let flag = true;
        
        for(let i=x;i<x+n;i++) {
            for(let j=y;j<y+n;j++) {
                if(flag && arr[x][y] !== arr[i][j]) {
                    flag = false;
                    break;
                }
            }
        }
        
        if(!flag) {
            const N = n / 2;
            recur(x,y,N); // 상단 왼쪽
            recur(x,y+N,N); // 상단 오른쪽
            recur(x+N,y,N); // 하단 왼쪽
            recur(x+N,y+N,N); // 하단 오른쪽
        } else {
            return answer[arr[x][y]]++
        }
    }
    recur(0,0,n);
    
    return answer;
}