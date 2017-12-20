class Day03Part2 {
  process(input) {
    let regex = /\s*(\d+)\s*(\d+)\s*(\d+)\s*(\d+)\s*(\d+)\s*(\d+)\s*(\d+)\s*(\d+)\s*(\d+)/g;
    let match;
    let total = 0;

    while (match = regex.exec(input)) {
      // Rework the array
      let a = [];
      for (let i = 1; i < 4; i++) {
        a.push([+match[i], +match[i + 3], +match[i + 6]].sort((a, b) => a - b).reduce((a, v, i) => i === 2 ? a > v : a + v));
      }
      total += a.reduce((a, v) => v ? a + 1 : a);
    }

    return total;
  }
}

module.exports = Day03Part2;