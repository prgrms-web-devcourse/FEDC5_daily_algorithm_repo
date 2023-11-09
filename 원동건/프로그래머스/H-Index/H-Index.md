### 첫 풀이

```js
function solution(citations) {
    // 논문 배열 인용 횟수 순으로 정렬
    // h = 인용 횟수
    // n = 논문 개수
    // i + 1 = 인용 횟수 이하 논문 개수
    // n - i = 인용 횟수 이상 논문 개수
    
    citations.sort((a,b) => a-b);
    const n = citations.length; // 논문 개수
    let Hindex = 0;
    
    for(let i = 0; i < citations.length; i++) {
        const h = citations[i]; // 인용 횟수
        
        if(h >= n - i && h <= i + 1) {
            Hindex = h;
        }
    }
    
    return Hindex;
}
```

>![[H-Index.png]]
>"h번 이하 인용된 논문이 h개 이하"라고 착각했습니다;;

---

### 두번째 풀이

```js
function solution(citations) {
    citations.sort((a,b) => b-a); // 내림차순 정렬
    let Hindex = 0;
    
    for(let i = 0; i < citations.length; i++) {
        const h = citations[i]; // 인용 횟수
        
        if(h <= i + 1) {
            Hindex = h;
            break;
        }
    }
    
    return Hindex;
}
```

> `i + 1` : h번 이상 인용된 논문의 갯수
> 
> 🤔 h번 이하로 인용된 논문 갯수가 가장 큰 값을 넣어주면 되지 않나?

---

### 그 분 풀이

```js
function solution(citations) {
    citations.sort((a,b) => b - a);
    let Hindex = 0;
    
    for(let i = 0; i < citations.length; i++) {
        if(citations[i] > i) {
            Hindex = i + 1;
        } else {
	        break;
        }
    }
    
    return Hindex;
}

```