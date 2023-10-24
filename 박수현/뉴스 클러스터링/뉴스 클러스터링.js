function solution(str1, str2) {
  const engExp = /^[a-zA-Z]*$/;

  str1 = str1.toLowerCase();
  str2 = str2.toLowerCase();

  const arr1 = [],
    arr2 = [];

  for (let i = 0; i < str1.length - 1; i++) {
    const sliced = str1.slice(i, i + 2);
    if (engExp.test(sliced)) {
      arr1.push(sliced);
    }
  }

  for (let i = 0; i < str2.length - 1; i++) {
    const sliced = str2.slice(i, i + 2);
    if (engExp.test(sliced)) {
      arr2.push(sliced);
    }
  }

  const intersect = [],
    union = [];

  for (let i = 0; i < arr1.length; i++) {
    const element = arr1[i];
    const element_idx = arr2.indexOf(element);

    if (element_idx >= 0) {
      intersect.push(arr2.splice(element_idx, 1)[0]);
    }
    union.push(element);
  }

  for (let i = 0; i < arr2.length; i++) {
    union.push(arr2[i]);
  }

  let intersect_cnt = intersect.length;
  let union_cnt = union.length;

  if (union_cnt === 0) {
    return 65536;
  }

  return Math.floor((intersect_cnt / union_cnt) * 65536);
}
