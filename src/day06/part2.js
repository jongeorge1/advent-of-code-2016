class Day06Part2 {
  sortByFrequency(array) {
    let frequency = {};

    array.forEach(value => {
      frequency[value] = 0;
    });

    let uniques = array.filter(value => ++frequency[value] == 1);

    return uniques.sort((a, b) => frequency[a] - frequency[b]);
  }

  process(input) {
    input = input.split('\r\n');
    let result = input[0].split('').map((col, i) => input.map(row => row[i])).map(this.sortByFrequency).reduce((p, c) => p + c[0], '');

    return result;
  }
}

module.exports = Day06Part2;