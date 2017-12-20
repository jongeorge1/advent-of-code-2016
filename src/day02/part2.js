class Day02Part2 {
  constructor() {
    this.grid = [
      [null, null, '1', null, null],
      [null, '2', '3', '4', null],
      ['5', '6', '7', '8', '9'],
      [null, 'A', 'B', 'C', null],
      [null, null, 'D', null, null]
    ];
  }

  process(input) {
    let commands = input.split('\n');
    let result = 0;
    let startPos = {
      x: 0,
      y: 2
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
    } else if (step === 'D' && startAt.y < 4) {
      stepResult = {
        x: startAt.x,
        y: startAt.y + 1
      };
    } else if (step === 'L' && startAt.x > 0) {
      stepResult = {
        x: startAt.x - 1,
        y: startAt.y
      };
    } else if (step === 'R' && startAt.x < 4) {
      stepResult = {
        x: startAt.x + 1,
        y: startAt.y
      };
    }

    if (stepResult && this.numberAt(stepResult) == null) {
      stepResult = null;
    }

    return stepResult || startAt;
  }
}

module.exports = Day02Part2;