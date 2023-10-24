function solution(k, d) {
  var answer = 0;

  // x^2 + y^2 = 거리^2
  for (let x = 0; x <= d; x += k) {
    // y = sqrt(거리^2 - x^2)
    const y = parseInt(Math.sqrt(d ** 2 - x ** 2));

    // (0,4) -> x가 0일 때 y 4가 최댓값 -> (0,0) (0,2) (0,4)
    // (2,3) -> x가 2일 때 y 3이 최댓값 -> (2,0) (2,2)
    // (4,0) -> x가 4일 때 y 0이 최댓값 -> (4,0)

    // (0,5) -> (0,0) (0,1) (0,2) (0,3) (0,4) (0,5)
    // (1,4) -> (1,0) (1,1) (1,2) (1,3) (1,4)
    // ...
    answer += parseInt(y / k) + 1;
  }
  return answer;
}
