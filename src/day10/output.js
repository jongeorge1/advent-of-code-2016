class Output {
  constructor(num) {
    this.name = 'Output ' + num;
    this.value = null;
  }

  setValue(val) {
    this.value = val;
  }
}

module.exports = Output;
