class Day04Part2 {
  process(input) {
    let regex = /([a-z\-]+)-(\d+)\[([a-z]+)\]/g;
    let match;
    let total = 0;

    while (match = regex.exec(input)) {
      let counts = {};
      match[1].replace(/-/g, '').split('').sort().forEach(x => counts[x] = (counts[x] || 0) + 1);
      let expectedChecksum = Object.keys(counts).map(x => [x, counts[x]]).sort((a, b) => a[1] == b[1] ? (a[0].charCodeAt(0) - b[0].charCodeAt(0)) : b[1] - a[1]).slice(0, 5).reduce((a, c) => a + c[0], '');

      if (match[3] == expectedChecksum) {
        let sector = +match[2];
        total += sector;

        let name = match[1].split('').map(x => x === '-' ? ' ' : String.fromCharCode(((x.charCodeAt(0) + sector - 97) % 26) + 97)).join('');
        if (name.indexOf('north') >= 0) {
          return sector;
        }
      }
    }
  }
}

module.exports = Day04Part2;