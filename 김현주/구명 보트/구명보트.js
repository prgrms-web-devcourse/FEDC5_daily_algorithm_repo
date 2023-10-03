function solution(people, limit) {
    var answer = 0;
    
    //내림차순 정렬
    people.sort((a,b) => b-a);
    
    //무거운 사람을 먼저 보트에 넣은 후, 가장 가벼운 사람 넣을 수 있으면 넣기
    let start = 0;
    let end = people.length - 1;
    
    while(start <= end) {
        if(people[start] + people[end] <= limit) { //동시에 탈 수 있다면 같이 탑승
            end--;
        }
        answer++;
        start++;
    }
    return answer;
}