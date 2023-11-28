function solution(s) {
  let answer = Infinity;

  if (s.length < 3) {
    return s.length;
  }

  const half_len = parseInt(s.length / 2);

  for (let cnt = 1; cnt <= half_len; cnt++) {
    let compress_str = "";

    let duplicated_str = s.slice(0, cnt);
    let duplicated_num = 1;

    for (let idx = cnt; idx < s.length; idx += cnt) {
      const current = s.slice(idx, idx + cnt);

      if (current === duplicated_str) {
        duplicated_num++;
        continue;
      }

      if (duplicated_num !== 1) {
        compress_str += duplicated_num;
      }
      compress_str += duplicated_str;

      duplicated_str = current;
      duplicated_num = 1;
    }

    if (duplicated_num !== 1) {
      compress_str += duplicated_num;
    }

    compress_str += duplicated_str;
    answer = Math.min(answer, compress_str.length);
  }

  return answer;
}
