function solution(word) {
    var answer = 0;
    
    const map = new Map(); //A,E,I,O,U 순서대로 +1
    map.set('A', 0)
    map.set('E', 1)
    map.set('I', 2)
    map.set('O', 3)
    map.set('U', 4)
    
    const weight = [781, 156, 31, 6, 1] // 가장 앞 글자가 바뀔땐 781씩, 가장 맨 뒤 글자는 바뀔때마다 1씩 바뀜.
    const arr = [...word]
    arr.forEach((char, index) => {
        const alpha = map.get(char) // 현재 알파벳을 구한 뒤
        answer += weight[index] * alpha // 현재 글자가 몇번째 위치에 있느냐에 따라 알파벳에 가중치를 곱해야한다.
    })
    answer += word.length // 처음 비교할 문자가 A, AA, AAA, AAAA, AAAAA이냐에 따라 다름... 주어진 문자가 1글자면 A랑 비교하면 되고, 3글자면 AAA랑 비교해야함~
    
    return answer;
}