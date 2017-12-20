class Day03Part1 {
  process(input) {
    return input.split('\r\n').map(c => c.split(/\s+/).slice(1).map(x => +x).sort((a, b) => a - b).reduce((a, v, i) => i === 2 ? a > v : a + v)).reduce((a, v) => v ? a + 1 : a);
  }
}

module.exports = Day03Part1;