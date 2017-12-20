let Display = require('./display');

class Day08Part2 {
  process(input) {
    input = input.split('\r\n');
    let regex = /(\d+)(x| by )(\d+)/;
    let display = new Display();

    for (var i = 0; i < input.length; i++) {
      var match = regex.exec(input[i]);
      if (input[i].startsWith('rotate row')) {
        display.rotateRow(+match[1], +match[3]);
      } else if (input[i].startsWith('rotate column')) {
        display.rotateColumn(+match[1], +match[3])
      } else {
        display.rect(+match[1], +match[3])
      }
    }

    return display.drawDisplay();
  }
}

module.exports = Day08Part2;