function solution(arr) {
  var answer = [0, 0];
  const rowSize = arr.length;

  function divide(x, y, size) {
    const value = arr[x][y];
    const halfSize = Math.floor(size / 2);

    for (let i = x; i < x + size; i++) {
      for (let j = y; j < y + size; j++) {
        if (arr[i][j] !== value) {
          divide(x, y, halfSize);
          divide(x + halfSize, y, halfSize);
          divide(x, y + halfSize, halfSize);
          divide(x + halfSize, y + halfSize, halfSize);

          return;
        }
      }
    }
    answer[value] += 1;
  }

  divide(0, 0, rowSize);

  return answer;
}
