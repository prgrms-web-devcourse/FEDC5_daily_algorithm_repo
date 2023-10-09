function solution(arr) {   
    let answer = [0,0]; // 각각 0, 1로 압축된 경우의 개수
    
    const divide = (row, col, len) => {
        let value = arr[row][col]; // 가장 첫번 째 값 저장 후, 해당 구역의 모든 값과 비교
        
        if(len == 1) { // 더 나눌 곳이 없는 경우
            answer[value]++; // 0 or 1 값 증가
            return;
        }
        
        let isCompressible = true; // 압축 가능 여부 저장
    
        //해당 구역의 값이 전부 똑같은 경우 압축 가능하다.
        for(let r=row;r<row+len;r++) {
            for(let c=col;c<col+len;c++) {
                if(arr[r][c] !== value) { //1개라도 값이 다르면 false
                    isCompressible = false;
                    break;
                }
            }
            if(!isCompressible) break;
        }

        if(isCompressible) { //압축 가능한 경우
            answer[value]++; // 0 or 1 값 증가
            return;
        }

        len /= 2; 
        //4개의 구역으로 다시 나눈다.
        divide(row, col, len);
        divide(row, col+len, len);
        divide(row+len, col, len);
        divide(row+len, col+len, len);
    }
     
    divide(0,0,arr.length)
    return answer;
}