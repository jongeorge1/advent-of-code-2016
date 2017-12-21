let Floor = require('./floor');

class Area {
  constructor(input) {
    this.elevator = 0;
    this.floors = [];

    if (input) {
      this.floors = input.split('\r\n').map((el, i) => new Floor(i + 1, el));
    }
  }

  clone() {
    let area = new Area();
    area.elevator = this.elevator;
    area.floors = this.floors.map(el => el.clone());

    return area;
  }

  isStateValid() {
    return this.floors.reduce((acc, el) => acc && el.isStateValid(), true);
  }

  get isStateFinished() {
    return this.floors.slice(0, -1).reduce((acc, el) => acc && el.isEmpty, true);
  }

  serialize() {
    return this.elevator + '~' + this.floors.map(el => el.serialize()).join('~');
  }

  getPossibleMoves() {
    let moves = [];
    
    if (this.elevator !== 0) {
      moves.push(...this.getPossibleMovesInDirection(-1));
    }

    if (this.elevator !== this.floors.length - 1) {
      moves.push(...this.getPossibleMovesInDirection(1));
    }

    return moves;
  }

  getPossibleMovesInDirection(direction) {
    let currentFloorIndex = this.elevator;
    let targetFloorIndex = this.elevator + direction;

    let currentFloorGenerators = this.floors[currentFloorIndex].generators;
    let currentFloorChips = this.floors[currentFloorIndex].chips;

    let moves = [];

    currentFloorGenerators.map(el => {
      let newArea = this.clone();
      newArea.floors[currentFloorIndex].removeGenerators(el);
      newArea.floors[targetFloorIndex].addGenerators(el);
      newArea.elevator = targetFloorIndex;
      moves.push(newArea);
    });

    currentFloorChips.map(el => {
      let newArea = this.clone();
      newArea.floors[currentFloorIndex].removeChips(el);
      newArea.floors[targetFloorIndex].addChips(el);
      newArea.elevator = targetFloorIndex;
      moves.push(newArea);
    });

    return moves.filter(el => el.isStateValid());
  }
}

module.exports = Area;