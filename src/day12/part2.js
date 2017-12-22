let Program = require('./program');

class Day12Part1 {
  process(input) {
    input = input.split('\r\n').map(el => el.split(' '));

    let program = new Program(0, 0, 1, 0);

    while (program.pointer < input.length) {
      let instruction = input[program.pointer];
      program[instruction[0]](instruction[1], instruction[2]);
    }

    return program.a;
  }
}

module.exports = Day12Part1;