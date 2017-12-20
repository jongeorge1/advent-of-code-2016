var md5 = require("md5");

class Day05Part1 {
  process(input) {
    let current = 1;
    let passcode = '';

    do {
      let hash = md5(input + current);
      if (hash.indexOf("00000") === 0) {
        passcode += hash[5];
      }

      current++;
    } while (passcode.length < 8);

    return passcode;
  }
}

module.exports = Day05Part1;