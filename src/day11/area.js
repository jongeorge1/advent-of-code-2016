let Floor = require('./floor');

class Area {
  constructor(input) {
    this.elevator = 0;
    this.floors = [];

    if (input) {
      this.floors = input.split('\r\n').map((el, i) => new Floor(i + 1, el));
    }
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
}

module.exports = Area;