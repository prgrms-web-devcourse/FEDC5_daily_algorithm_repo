function solution(word) {
    let arr = [];
    let strArr = ['A','E','I','O','U',''];
    
    function dfs(L, str) {
        if(L === 5) {
            arr.push(str);
            return
        }
        for(let i=0;i<strArr.length;i++) {
            dfs(L+1, str + strArr[i]);
            
        }
    }
    dfs(0, '');
    let setArr = [...new Set(arr.sort())];
    return setArr.indexOf(word)
}