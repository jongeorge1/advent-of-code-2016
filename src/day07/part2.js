class Day07Part2 {
  process(input) {
    input = input.split('\r\n');
    let notRegex = /\[(\w+)\]/g;
    let supportsSslCount = 0;

    for (let i = 0; i < input.length; i++) {
      let row = input[i];
      let notSections = [];
      let match;

      while (match = notRegex.exec(row)) {
        notSections.push(match[1]);
      }

      let sections = row.replace(notRegex, '~').split('~');

      let abas = sections.map(this.getAbas).reduce(this.mergeReducer, []);
      let babs = notSections.map(this.getAbas).reduce(this.mergeReducer, []);

      let supportsSsl = false;
      for (let j = 0; j < abas.length; j++) {
        let bab = abas[j][1] + abas[j][0] + abas[j][1];
        if (babs.indexOf(bab) !== -1) {
          supportsSsl = true;
          break;
        }
      }

      if (supportsSsl) {
        supportsSslCount++;
      }
    }

    return supportsSslCount;
  }

  mergeReducer(v, p) {
    return v.concat(p);
  }

  getAbas(input) {
    let result = [];

    for (let i = 0; i < input.length - 2; i++) {
      if (input.substr(i, 1) === input.substr(i + 2, 1) && input.substr(i, 1) !== input.substr(i + 1, 1)) {
        result.push(input.substr(i, 3));
      }
    }

    return result;
  }
}

module.exports = Day07Part2;