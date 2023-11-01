function solution(begin, target, words) {
    if(!words.includes(target)) { //target이 없는 경우
        return 0;
    }

    const queue = []
    queue.push([begin, 0])
    
    //BFS
    while(queue.length > 0) {
        const [popWord, count] = queue.shift()
        if(popWord === target) {
            return count
        }
        words.forEach((word, i) => {
            if([...word].filter((char, i) => char !== popWord[i]).length === 1) {
                queue.push([word, count+1])
                words.splice(i,1)
            }
        })
    }
}