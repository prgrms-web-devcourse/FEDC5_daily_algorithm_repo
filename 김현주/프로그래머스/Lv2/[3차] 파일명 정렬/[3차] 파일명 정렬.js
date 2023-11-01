function solution(files) {
    var answer = [];
    
    splitFiles = [];
    files.forEach(fileName => {
        //HEAD는 문자. 한글자 이상
        //1-5글자의 숫자
        //나머지는 TAIL
        const index1 = [...fileName].findIndex(str=> isNaN(parseInt(str)) === false);
        const HEAD = index1 > 0 ? fileName.slice(0, index1) : ''

        const index2 = Math.min([...fileName.slice(index1)].findIndex(str=> isNaN(parseInt(str)) === true), 5)
        const NUMBER = index2 > 0 ? fileName.slice(index1, index1+index2) : fileName.slice(index1)
        
        const TAIL = index2 > 0 ? fileName.slice(index1+index2) : ''
       
        splitFiles.push([HEAD, NUMBER, TAIL])
    })
    
    const compare = (a,b) => {
        if(a[0].toUpperCase() === b[0].toUpperCase()) {
            if(parseInt(a[1]) === parseInt(b[1])) {
                return 0;
            }
            else {
                return parseInt(a[1])-parseInt(b[1])
            }
        }
        else {
            return a[0].toUpperCase() < b[0].toUpperCase() ? -1 : 1
        }
    }
    
    splitFiles.sort((a,b) => compare(a,b))
    
    answer = splitFiles.map(splitfile => splitfile.join(''))
    return answer;
}