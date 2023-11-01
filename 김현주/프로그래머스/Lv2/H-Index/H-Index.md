# [level 2] H-Index - 42747 

[문제 링크](https://school.programmers.co.kr/learn/courses/30/lessons/42747?language=cpp) 

### 성능 요약

메모리: 4.14 MB, 시간: 0.01 ms

### 구분

코딩테스트 연습 > 정렬

### 채점결과

정확성: 100.0<br/>합계: 100.0 / 100.0

### 제출 일자

2023년 10월 3일 1:56:55

### 문제 설명

<p>H-Index는 과학자의 생산성과 영향력을 나타내는 지표입니다. 어느 과학자의 H-Index를 나타내는 값인 h를 구하려고 합니다. 위키백과<sup id="fnref1"><a href="#fn1">1</a></sup>에 따르면, H-Index는 다음과 같이 구합니다.</p>

<p>어떤 과학자가 발표한 논문 <code>n</code>편 중, <code>h</code>번 이상 인용된 논문이 <code>h</code>편 이상이고 나머지 논문이 h번 이하 인용되었다면 <code>h</code>의 최댓값이 이 과학자의 H-Index입니다.</p>

<p>어떤 과학자가 발표한 논문의 인용 횟수를 담은 배열 citations가 매개변수로 주어질 때, 이 과학자의 H-Index를 return 하도록 solution 함수를 작성해주세요.</p>

<h5>제한사항</h5>

<ul>
<li>과학자가 발표한 논문의 수는 1편 이상 1,000편 이하입니다.</li>
<li>논문별 인용 횟수는 0회 이상 10,000회 이하입니다.</li>
</ul>

<h5>입출력 예</h5>
<table class="table">
        <thead><tr>
<th>citations</th>
<th>return</th>
</tr>
</thead>
        <tbody><tr>
<td>[3, 0, 6, 1, 5]</td>
<td>3</td>
</tr>
</tbody>
      </table>
<h5>입출력 예 설명</h5>

<p>이 과학자가 발표한 논문의 수는 5편이고, 그중 3편의 논문은 3회 이상 인용되었습니다. 그리고 나머지 2편의 논문은 3회 이하 인용되었기 때문에 이 과학자의 H-Index는 3입니다.</p>

<h5>문제가 잘 안풀린다면😢</h5>

<p>힌트가 필요한가요? [코딩테스트 연습 힌트 모음집]으로 오세요! → <a href="https://school.programmers.co.kr/learn/courses/14743?itm_content=lesson42747" target="_blank" rel="noopener">클릭</a></p>

<p>※ 공지 - 2019년 2월 28일 테스트 케이스가 추가되었습니다.</p>

<div class="footnotes">
<hr>
<ol>

<li id="fn1">
<p><a href="https://en.wikipedia.org/wiki/H-index" target="_blank" rel="noopener">https://en.wikipedia.org/wiki/H-index</a> "위키백과"&nbsp;<a href="#fnref1">↩</a></p>
</li>

</ol>
</div>


> 출처: 프로그래머스 코딩 테스트 연습, https://school.programmers.co.kr/learn/challenges


---

### 처음 생각한 알고리즘

- 내림차순으로 정렬한다.
- h의 초기값은 가장 높은 숫자(0번째 인덱스)로 설정한다.
- h번 이상 인용된 논문의 개수가 h개 이상이 될 때까지 비교한다.
- H-index를 감소시켜가면서 h의 최댓값을 찾는다.


### 처음 코드

```jsx
function solution(citations) {
    citations.sort((a,b) => b-a); //내림차순 정렬
    
    let h = citations[0]; //H-Index
    let count = 0; //h편 이상 인용된 논문의 개수
    
    while(count < h) {
        citations.forEach(citation => {
            if(citation < h) { //현재 논문의 인용된 수가 h보다 작으면 멈추고 판단
                return false;
            }
            count++;
        })
        
        if(count >= h) { //만약 h번 이상 인용된 논문이 h편 이상이면
            break;  
        }
        
        h--; //H-index를 감소시켜가면서 h의 최댓값을 찾는다.
        count = 0;
    }      
    
    return h;
}
```


| 테스트 1 〉 | 통과 (63.43ms, 35.9MB) |
| --- | --- |
| 테스트 2 〉 | 통과 (124.85ms, 36.9MB) |
| 테스트 3 〉 | 통과 (115.85ms, 36.7MB) |
| 테스트 4 〉 | 통과 (79.16ms, 35.9MB) |
| 테스트 5 〉 | 통과 (98.79ms, 35.9MB) |
| 테스트 6 〉 | 통과 (102.24ms, 35.9MB) |
| 테스트 7 〉 | 통과 (42.97ms, 35.8MB) |
| 테스트 8 〉 | 통과 (9.24ms, 35.8MB) |
| 테스트 9 〉 | 통과 (16.80ms, 35.8MB) |
| 테스트 10 〉 | 통과 (53.33ms, 36MB) |
| 테스트 11 〉 | 통과 (110.27ms, 35.9MB) |
| 테스트 12 〉 | 통과 (20.79ms, 36MB) |
| 테스트 13 〉 | 통과 (101.03ms, 36MB) |
| 테스트 14 〉 | 통과 (98.39ms, 35.8MB) |
| 테스트 15 〉 | 통과 (102.60ms, 35.8MB) |
| 테스트 16 〉 | 통과 (0.05ms, 33.4MB) |


> 통과는 했지만 while, forEach를 이중으로 사용해 시간이 오래걸림...


### 새로운 풀이

- 내림차순으로 정렬
- H-Index를 큰 숫자에서 점점 줄여나가는 방법으로 비교하는 기존 방식대신, **0에서부터 점점 늘려가는 방식** 으로 선택
- h번 이상 인용된 논문이 h편 이상인 경우, H-index 업데이트
- 만약 아닌 경우, 내림차순 정렬되어있으므로 남은 배열은 더이상 비교할 필요가 없다.


### JS 코드

```jsx
function solution(citations) {
    citations.sort((a,b) => b-a); //내림차순 정렬
    
    let h = 0;

    citations.forEach((citation, index) => {
        let count = index+1; //논문의 개수
        if(count <= citation) { //만약 h번 이상 인용된 논문이 h편 이상인 경우
            h = count; //H-Index가 된다.
        }
        else {
            return false; //내림차순 정렬되어있으므로 나머지는 비교할 필요가 없다.
        }
    })

    return h;
}
```


| 테스트 1 〉 | 통과 (0.29ms, 33.4MB) |
| --- | --- |
| 테스트 2 〉 | 통과 (0.35ms, 33.4MB) |
| 테스트 3 〉 | 통과 (0.33ms, 33.5MB) |
| 테스트 4 〉 | 통과 (0.34ms, 33.5MB) |
| 테스트 5 〉 | 통과 (0.37ms, 33.4MB) |
| 테스트 6 〉 | 통과 (0.42ms, 33.6MB) |
| 테스트 7 〉 | 통과 (0.21ms, 33.5MB) |
| 테스트 8 〉 | 통과 (0.13ms, 33.5MB) |
| 테스트 9 〉 | 통과 (0.15ms, 33.5MB) |
| 테스트 10 〉 | 통과 (0.24ms, 33.5MB) |
| 테스트 11 〉 | 통과 (0.43ms, 33.5MB) |
| 테스트 12 〉 | 통과 (0.18ms, 33.4MB) |
| 테스트 13 〉 | 통과 (0.38ms, 33.5MB) |
| 테스트 14 〉 | 통과 (0.36ms, 33.5MB) |
| 테스트 15 〉 | 통과 (0.42ms, 33.6MB) |
| 테스트 16 〉 | 통과 (0.07ms, 33.5MB) |

> 속도가 매우 개선 되었다.


### C++ 코드

```cpp
#include <string>
#include <vector>
#include <algorithm>

using namespace std;

int solution(vector<int> citations) {
    sort(citations.begin(), citations.end(), greater<>()); //내림차순 정렬
    int H = 0;
    for(int i=0;i<citations.size();i++) {
        int count = i+1; //논문의 개수
        if(count <= citations[i]) { //만약 h번 이상 인용된 논문이 h편 이상인 경우
            H = count; //H-Index가 된다.
        }
        else {
            break;
        }
    }
    return H;
}
```

| 테스트 1 〉 | 통과 (0.03ms, 4.14MB) |
| --- | --- |
| 테스트 2 〉 | 통과 (0.04ms, 4.11MB) |
| 테스트 3 〉 | 통과 (0.04ms, 3.76MB) |
| 테스트 4 〉 | 통과 (0.03ms, 4.21MB) |
| 테스트 5 〉 | 통과 (0.03ms, 4.14MB) |
| 테스트 6 〉 | 통과 (0.04ms, 4.01MB) |
| 테스트 7 〉 | 통과 (0.02ms, 3.68MB) |
| 테스트 8 〉 | 통과 (0.01ms, 4.21MB) |
| 테스트 9 〉 | 통과 (0.01ms, 4.16MB) |
| 테스트 10 〉 | 통과 (0.02ms, 4.21MB) |
| 테스트 11 〉 | 통과 (0.06ms, 4.2MB) |
| 테스트 12 〉 | 통과 (0.01ms, 4.22MB) |
| 테스트 13 〉 | 통과 (0.04ms, 4.21MB) |
| 테스트 14 〉 | 통과 (0.03ms, 4.02MB) |
| 테스트 15 〉 | 통과 (0.05ms, 4.14MB) |
| 테스트 16 〉 | 통과 (0.01ms, 4.14MB) |


> C++는 더 빠르네..
