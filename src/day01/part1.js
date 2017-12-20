class Day01Part1 {
  constructor() {
    this.direction = 0; // N
    this.movementMatrices = [
      { x: 0, y: 1 },
      { x: 1, y: 0 },
      { x: 0, y: -1 },
      { x: -1, y: 0 }
    ];
  }

  changeDirection(move) {
    let newDirection = move === 'L' ? this.direction - 1 : this.direction + 1;
    this.direction = (newDirection + 4) % 4;
  }

  process(input) {
    let commands = input.split(', ');
    let location = { x: 0, y: 0 };

    for (let command of commands) {
      let direction = command.substr(0, 1);
      let distance = +command.substr(1);
      this.changeDirection(direction);
      let matrix = this.movementMatrices[this.direction];

      location.x += distance * matrix.x;
      location.y += distance * matrix.y;
    }

    return Math.abs(location.x) + Math.abs(location.y);
  }
}

module.exports = Day01Part1;