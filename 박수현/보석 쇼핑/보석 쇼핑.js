function solution(gems) {
  let answer = [0, gems.length - 1];
  const gem_map = new Map();
  const gem_size = new Set(gems).size;

  for (let idx = 0; idx < gems.length; idx++) {
    const gem = gems[idx];
    if (gem_map.has(gem)) {
      gem_map.delete(gem);
    }

    gem_map.set(gem, idx);

    if (gem_map.size === gem_size) {
      const answer_size = answer[1] - answer[0];
      const first_idx = gem_map.values().next().value;
      const current_size = idx - first_idx;

      if (answer_size > current_size) {
        answer = [first_idx, idx];
      }
    }
  }
  return [answer[0] + 1, answer[1] + 1];
}
