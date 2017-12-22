class Program {
  constructor(a, b, c, d) {
    this.a = a || 0;
    this.b = b || 0;
    this.c = c || 0;
    this.d = d || 0;

    this.pointer = 0;
  }

  numberOrRegister(input) {
    let val = parseInt(input);
    if (isNaN(val)) {
      return this[input];
    }

    return val;
  }

  cpy(x, y) {
    this[y] = this.numberOrRegister(x);
    this.pointer++;
  }

  inc(x) {
    this[x] = this[x] + 1;
    this.pointer++;
  }

  dec(x) {
    this[x] = this[x] - 1;
    this.pointer++;
  }

  jnz(x, y) {
    if (this.numberOrRegister(x) !== 0) {
      this.pointer += this.numberOrRegister(y);
    } else {
      this.pointer++;
    }
  }
}

module.exports = Program;