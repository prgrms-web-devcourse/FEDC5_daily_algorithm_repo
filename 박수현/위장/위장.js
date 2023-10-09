function solution(clothes) {
  let answer = 1;
  const clothesMap = new Map();

  for (const [, type] of clothes) {
    if (clothesMap.has(type)) {
      clothesMap.set(type, clothesMap.get(type) + 1);
    } else {
      clothesMap.set(type, 1);
    }
  }

  for (const count of clothesMap.values()) {
    answer *= count + 1;
  }

  return answer - 1;
}
