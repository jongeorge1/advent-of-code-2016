class Day07Part1 {
  process(input) {
    input = input.split('\r\n');

    let notRegex = /\[(\w+)\]/g;
    let supportsTlsCount = 0;

    for (let i = 0; i < input.length; i++) {
      // Extract the sections in square brackets
      let row = input[i];
      let notSections = [];
      let match;

      while (match = notRegex.exec(row)) {
        notSections.push(match[1]);
      }

      let sections = row.replace(notRegex, '~').split('~');

      let sectionsContainsAbba = sections.map(this.containsAbba).reduce(this.orReducer, false);
      let notSectionsContainsAbba = notSections.map(this.containsAbba).reduce(this.orReducer, false);

      let supportsTls = sectionsContainsAbba && !notSectionsContainsAbba;

      if (supportsTls) {
        supportsTlsCount++;
      }
    }

    return supportsTlsCount;
  }

  orReducer(v, p) {
    return v || p;
  }

  containsAbba(input) {
    // console.log(input);
    for (let i = 0; i < input.length - 3; i++) {
      let source = input.substr(i, 2);
      if (source[0] !== source[1]) {
        let target = input.substr(i + 2, 2);
        let search = source.split('').reverse().join('');
        if (target === search) {
          return true;
        }
      }
    }

    return false;
  }
}

module.exports = Day07Part1;