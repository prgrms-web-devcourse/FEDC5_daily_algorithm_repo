function solution(files) {
  let answer = [];

  for (const file of files) {
    let head = "",
      number = "",
      tail = "";

    // 1. 반복문을 돌면서 head, number, tail 추출
    for (let i = 0; i < file.length; i++) {
      const current = file[i];
      if (current.length === 0) continue;

      const isNumber = !isNaN(parseInt(current));

      // 2. 숫자일 때
      if (isNumber) {
        if (tail.length === 0) {
          number += current;
        } else {
          tail += current;
        }
      } else {
        // 3. 숫자가 아닐 때
        if (number.length === 0) {
          head += current;
        } else {
          tail += current;
        }
      }
    }

    // 4. 원본 문자열을 포함해서 위 3가지 요소를 배열에 추가
    answer.push([head, number, tail, file]);
  }

  // 5. 정렬
  answer.sort((a, b) => {
    // 5-1. 대소문자 구분이 없기 때문에 소문자로 변환
    const head_a = a[0].toLowerCase(),
      head_b = b[0].toLowerCase();
    const num_a = parseInt(a[1]),
      num_b = parseInt(b[1]);

    // 5-2. 사전순 정렬
    if (head_a > head_b) {
      return 1;
    } else if (head_a < head_b) {
      return -1;
    } else {
      // 5-3. 만약 둘이 같다면 number 값 비교 (0을 없애기 위해 숫자로 변환하고 내림차순 정렬)
      return num_a - num_b;
    }
  });

  return answer.map((item) => item[3]);
}
