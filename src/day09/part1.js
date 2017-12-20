class Day09Part1 {
  process(input) {
    let start = 0;
    let pos = input.indexOf('(');
    let output = 0;

    while (pos !== -1 && pos < input.length) {
      output += pos - start;

      // Find the end index, pull out the numbers
      let end = input.indexOf(')', pos);
      let commandStr = input.substring(pos + 1, end);
      let commandSections = commandStr.split('x');
      let repeats = +commandSections[1]
      let len = +commandSections[0]

      let target = input.substr(end + 1, len);

      output += (target.length * repeats);

      start = end + len + 1
      pos = input.indexOf('(', start);
    }

    if (start < input.length) {
      output += input.length - start;
    }

    return output;
  }
}

module.exports = Day09Part1;