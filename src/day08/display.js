class Display {
  constructor() {
    this.matrix = [];
    this.height = 6;
    this.width = 50;

    for (let i = 0; i < this.height; i++) {
      let row = new Array(this.width);
      row.fill(false);
      this.matrix.push(row);
    }
  }

  rotateRow(y, count) {
    let row = this.matrix[y];
    let lastFew = row.splice(-count, count);
    lastFew.splice(0, 0, 0, 0);
    row.splice.apply(row, lastFew);
  }

  rotateColumn(x, count) {
    // Manky solution, repeatedly rotate by 1
    for (let i = 0; i < count; i++) {
      let last = this.matrix[this.height - 1][x];

      for (let j = this.height; --j; j > 0) {
        this.matrix[j][x] = this.matrix[j - 1][x];
      }

      this.matrix[0][x] = last;
    }
  }

  rect(x, y) {
    for (let i = 0; i < y; i++) {
      for (let j = 0; j < x; j++) {
        this.matrix[i][j] = true;
      }
    }
  }

  countLeds() {
    return this.matrix.map(x => x.reduce((p, c) => p + (c ? 1 : 0), 0)).reduce((p, c) => p + c, 0);
  }

  drawDisplay() {
    return this.matrix.map(el => el.reduce((p, c) => p + (c ? '#' : '.'), '')).join('\n');
  }
}

module.exports = Display;