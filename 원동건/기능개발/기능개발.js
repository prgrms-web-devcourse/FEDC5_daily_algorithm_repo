function solution(progresses, speeds) {

    let 작업일 = 0;
    const 배포 = [];
    
    for(let i = 0; i < progresses.length; i++) {
        const 진행속도 = speeds[i];
        const 남은작업 = 100 - progresses[i] - (진행속도 * 작업일);
              
        // 남은 작업이 있으면 배포가 미뤄짐
        if(남은작업 > 0) {
            작업일 += Math.ceil( 남은작업 / 진행속도 );
            배포.push(0);
        }
        
        배포[배포.length-1] += 1;
    }
    
    return 배포;
}