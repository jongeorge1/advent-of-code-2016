class Floor {
  constructor(level, input) {
    this.level = level;
    this.chips = [];
    this.generators = [];

    if (input) {
      this.parse(input);
    }
  }

  parse(input) {
    if (input.indexOf('relevant.') !== -1) {
      return;
    }
    
    let components = input.split(',');
    components;
    components.map(el => this.parseInputComponent(el));
  }

  get isEmpty() {
    return this.chips.length === 0 && this.generators.length === 0;
  }

  addChips() {
    this.chips.push(...arguments);
    this.chips.sort();
  }

  addGenerators() {
    this.generators.push(...arguments);
    this.generators.sort();
  }

  parseInputComponent(input) {
    let components = input.split(' ');
    let element = components[components.length - 2].replace('-compatible', '');
    let device = components[components.length - 1].replace('.', '');
    element;
    if (device === 'generator') {
      this.generators.push(element);
    } else {
      this.chips.push(element);
    }
  }

  isStateValid() {
    if (this.generators.length === 0 || this.chips.length === 0) {
      return true;
    }

    // Need to see if there's a chip without it's generator
    return this.chips.reduce((acc, el) => acc && this.generators.indexOf(el) !== -1, true);
  }

  serialize() {
    return `${this.level}|${this.generators.join(',')}|${this.chips.join(',')}`;
  }
}

module.exports = Floor;