function solution(record) {
  let answer = [],
    message = [];
  const user_map = new Map();

  for (let i = 0; i < record.length; i++) {
    const [command, uid, name] = record[i].split(" ");

    if (command === "Leave") {
      message.push([uid, "님이 나갔습니다."]);
      continue;
    }

    if (command == "Enter") {
      message.push([uid, "님이 들어왔습니다."]);
    }

    user_map.set(uid, name);
  }

  for (const [uid, statement] of message) {
    answer.push(`${user_map.get(uid)}${statement}`);
  }

  return answer;
}
