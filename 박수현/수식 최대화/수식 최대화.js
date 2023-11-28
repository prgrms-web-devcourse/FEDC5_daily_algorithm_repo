const permutation = (path, rests, output) => {
  if (rests.length == 0) {
    return output.push(path);
  }
  rests.forEach((current, idx) => {
    const prev = rests.slice(0, idx);
    const after = rests.slice(idx + 1);
    const rest = [...prev, ...after];
    permutation([...path, current], rest, output);
  });
};

function calculate(a, b, exp) {
  a = Number(a);
  b = Number(b);

  if (exp === "*") return a * b;
  else if (exp === "+") return a + b;
  else return a - b;
}

function solution(expression) {
  let answer = 0;

  const all_exp_list = [];
  let exp_list = [];
  let num_list = [];
  let numbers = "";

  [...expression].forEach((exp) => {
    const isExp = isNaN(Number(exp));
    if (isExp) {
      exp_list.push(exp);
      num_list.push(numbers);
      numbers = "";
    } else {
      numbers += exp;
    }
  });

  num_list.push(numbers);

  permutation([], ["+", "-", "*"], all_exp_list);

  all_exp_list.forEach((exps) => {
    let nums = [...num_list];
    let ops = [...exp_list];

    exps.forEach((exp) => {
      if (ops.indexOf(exp) === -1) {
        return;
      }

      let index = ops.indexOf(exp);

      while (index !== -1) {
        nums[index] = calculate(nums[index], nums[index + 1], exp);
        nums.splice(index + 1, 1);
        ops.splice(index, 1);
        index = ops.indexOf(exp);
      }
    });
    answer = Math.max(Math.abs(nums[0]), answer);
  });
  return answer;
}
