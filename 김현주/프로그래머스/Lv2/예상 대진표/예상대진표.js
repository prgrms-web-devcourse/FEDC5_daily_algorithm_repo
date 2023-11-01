function solution(n,a,b)
{
    var answer = 1;
    
    if(a > b) {
        [b, a] = [a, b];
    }

    while(true) {
        if(b-a == 1 && b%2 == 0) break;
        a = Math.floor((a+1)/2); //2 1
        b = Math.floor((b+1)/2); //4 2
        console.log(a,b)
        answer++;
    }

    return answer;
}