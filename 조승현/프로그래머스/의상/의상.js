function solution(clothes) {
    let answer = 1;
    const map = new Map();
  
    // 종류별로 의상의 수 map에 저장
    clothes.forEach((cloth) => {
      map.has(cloth[1])
        ? map.set(cloth[1], map.get(cloth[1]) + 1)
        : map.set(cloth[1], 1);
    });
  
    // n개중 r개를 선택하는 조합의 수
    function combi(n, r) {
      if (n === r || r === 0) return 1;
      return combi(n - 1, r - 1) + combi(n - 1, r);
    }
  
    for (const [key, value] of map) {
      // value개 중에 1개 뽑는 조합
      answer *= combi(value + 1, 1);
    }
  
    // 옷을 전부 벗었을 때의 수 = 1
    return answer - 1;
  }