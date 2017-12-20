var md5 = require("md5");

class Day05Part2 {
  process(input) {
    var current = 1;

    var passcode = [];
    var count = 0;

    do {
      var hash = md5(input + current);
      if (hash.indexOf("00000") === 0) {
        var pos = parseInt(hash[5]);
        if (!isNaN(pos) && pos >= 0 && pos < 8 && !passcode[pos]) {
          passcode[pos] = hash[6];
          count++;
        }
      }
      current++;
    } while (count < 8);

    return passcode.join('');
  }
}

module.exports = Day05Part2;