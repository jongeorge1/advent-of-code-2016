class Bot {
  constructor(num) {
    this.name = 'Bot ' + num;
    this.values = [];
    this.lowDestination = null;
    this.highDestination = null;
    this.executed = false;
  }

  setValue(val) {
    this.values.push(val);
  }

  setLowDestination(dest) {
    this.lowDestination = dest;
  }

  setHighDestination(dest) {
    this.highDestination = dest;
  }

  destinationCount() {
    return (this.lowDestination ? 1 : 0) + (this.highDestination ? 1 : 0)
  }

  hasValues(low, high) {
    return this.lowValue() === low && this.highValue() === high;
  }

  canExecute() {
    return this.values.length === 2 && !this.executed;
  }

  lowValue() {
    return Math.min.apply(null, this.values);
  }

  highValue() {
    return Math.max.apply(null, this.values);
  }

  execute() {
    this.lowDestination.setValue(this.lowValue());
    this.highDestination.setValue(this.highValue());
    this.executed = true;
  }
}

module.exports = Bot;