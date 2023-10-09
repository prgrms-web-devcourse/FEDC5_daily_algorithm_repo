// 해시 이용 풀이
function solution(phone_book) {
  const hash = {};

  for (const phoneNumber of phone_book) {
    hash[phoneNumber] = 1;
  }

  for (const phoneNumber of phone_book) {
    let temp = "";

    for (const number of phoneNumber) {
      temp += number;

      if (hash[temp] && temp !== phoneNumber) {
        return false;
      }
    }
  }
  return true;
}

// 정렬 이용 풀이
function solution(phone_book) {
  phone_book.sort();

  for (let i = 0; i < phone_book.length - 1; i++) {
    const prev = phone_book[i];
    const next = phone_book[i + 1];

    if (next.startsWith(prev)) {
      return false;
    }
  }

  return true;
}
