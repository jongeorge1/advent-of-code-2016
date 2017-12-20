class Day02Part1 {
  constructor() {
    this.grid = [
      ['1', '2', '3'],
      ['4', '5', '6'],
      ['7', '8', '9'],
    ];
  }

  process(input) {
    let commands = input.split('\n');
    let result = 0;
    let startPos = {
      x: 1,
      y: 1
    };

    for (let i = 0; i < commands.length; i++) {
      let numberPos = this.processCommand(startPos, commands[i]);
      result += this.numberAt(numberPos);

      startPos = numberPos;
    }

    return result;
  }

  processCommand(startAt, command) {
    var pos = startAt;

    for (var i = 0; i < command.length; i++) {
      pos = this.processStep(pos, command[i]);
    }

    return pos;
  }

  numberAt(pos) {
    return this.grid[pos.y][pos.x];
  }

  processStep(startAt, step) {
    var stepResult;

    if (step === 'U' && startAt.y > 0) {
      stepResult = {
        x: startAt.x,
        y: startAt.y - 1
      };
    } else if (step === 'D' && startAt.y < 2) {
      stepResult = {
        x: startAt.x,
        y: startAt.y + 1
      };
    } else if (step === 'L' && startAt.x > 0) {
      stepResult = {
        x: startAt.x - 1,
        y: startAt.y
      };
    } else if (step === 'R' && startAt.x < 2) {
      stepResult = {
        x: startAt.x + 1,
        y: startAt.y
      };
    }

    return stepResult || startAt;
  }
}

module.exports = Day02Part1;