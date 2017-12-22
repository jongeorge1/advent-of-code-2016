class Day13Part1 {
  process(input) {
    this.num = +input;
    this.targetX = 31;
    this.targetY = 39;

    return this.findDistanceFrom(0, 0, []);
  }

  findDistanceFrom(x, y, visited) {
    if (x === this.targetX && y === this.targetY) {
      return 0;
    }

    if (x > 100 || y > 100) {
      return null;
    }

    // console.log('Not there yet');

    visited.push(x + ':' + y);

    // Look around
    let distancesFromNeighbours = [];
    
    if (x > 0 && !this.isWall(x - 1, y) && visited.indexOf((x - 1) + ':' + y) === -1) {
      // console.log('Go left');
      distancesFromNeighbours.push(this.findDistanceFrom(x - 1, y, visited.slice()));
    }

    if (!this.isWall(x + 1, y) && visited.indexOf((x + 1) + ':' + y) === -1) {
      // console.log('Go right');
      distancesFromNeighbours.push(this.findDistanceFrom(x + 1, y, visited.slice()));
    }

    if (y > 0 && !this.isWall(x, y - 1) && visited.indexOf(x + ':' + (y - 1)) === -1) {
      // console.log('Go up');
      distancesFromNeighbours.push(this.findDistanceFrom(x, y - 1, visited.slice()));
    }

    if (!this.isWall(x, y + 1) && visited.indexOf(x + ':' + (y + 1)) === -1) {
      // console.log('Go down');
      distancesFromNeighbours.push(this.findDistanceFrom(x, y + 1, visited.slice()));
    }

    distancesFromNeighbours = distancesFromNeighbours.filter(el => el !== null);

    if (distancesFromNeighbours.length) {
      // console.log(distancesFromNeighbours);
      return 1 + Math.min.apply(null, distancesFromNeighbours);
    }

    // console.log('not from here');
    return null;
  }

  isWall(x, y) {
    let p1 = (x * x) + (3 * x) + (2 * x * y) + y + (y * y);
    p1 += this.num;
    let bin = p1.toString(2);
    let onBits = bin.split('').reduce((acc, el) => acc + +el, 0);
    
    return (onBits % 2 === 1);
  }
}

module.exports = Day13Part1;