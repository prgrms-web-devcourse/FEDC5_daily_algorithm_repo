const fs = require("fs");
const input = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `input.txt`
)
  .trim()
  .split("\n");

// 1. 스위치와 학생에 대한 배열 만들기 (문자열을 모두 숫자 형태로)
const switches = input.shift().split(" ").map(Number);
const students = input.slice(1).map((item) => item.split(" ").map(Number));
const answer = [];

// 3. 남학생의 경우 cnt의 배수이면 값을 반대로 변경해주기
function boy(cnt) {
  for (let i = 0; i < switches.length; i++) {
    const switch_num = i + 1;

    if (switch_num % cnt === 0) {
      switches[i] = switches[i] === 0 ? 1 : 0;
    }
  }
}

// 4. 여학생의 경우 최대 범위를 구해준 다음, gap을 하나씩 늘려가면서 양쪽 값이 같다면 반대로 변경해주기
function girl(cnt) {
  const switch_num = cnt - 1;
  const range = Math.max(switches.length - cnt, switch_num);
  switches[switch_num] = switches[switch_num] === 0 ? 1 : 0;

  let gap = 1;

  while (gap <= range) {
    const left = switch_num - gap;
    const right = switch_num + gap;

    if (switches[left] !== switches[right]) break;

    switches[left] = switches[left] === 0 ? 1 : 0;
    switches[right] = switches[right] === 0 ? 1 : 0;

    gap++;
  }
}

// 2. 타입에 따라서 남학생, 여학생 분기

students.forEach(([type, cnt]) => {
  if (type === 1) {
    boy(cnt);
  }
  if (type === 2) {
    girl(cnt);
  }
});

while (switches.length > 0) {
  answer.push(switches.splice(0, 20).join(" "));
}

console.log(answer.join("\n"));
