require('fs').readFile('day7-input.txt', function (err, data) {
    var input = ("" + data).split('\r\n');

    var notRegex = /\[(\w+)\]/g;
    var supportsTlsCount = 0;
    var supportsSslCount = 0;

    for (var i = 0; i < input.length; i++) {
        // Extract the sections in square brackets
        var row = input[i];
        var notSections = [];
        var match;
        
        while (match = notRegex.exec(row)) {
            notSections.push(match[1]);
        }

        var sections = row.replace(notRegex, '~').split('~');

        var sectionsContainsAbba = sections.map(containsAbba).reduce(orReducer, false);
        var notSectionsContainsAbba = notSections.map(containsAbba).reduce(orReducer, false);

        var supportsTls = sectionsContainsAbba && !notSectionsContainsAbba;

        var abas = sections.map(getAbas).reduce(mergeReducer, []);
        var babs = notSections.map(getAbas).reduce(mergeReducer, []);

        var supportsSsl = false;
        for (var j = 0; j < abas.length; j++) {
            var bab = abas[j][1] + abas[j][0] + abas[j][1];
            if (babs.indexOf(bab) !== -1) {
                supportsSsl = true;
                break;
            }
        }

        // console.log(row);
        // console.log(sections);
        // console.log(sectionsContainsAbba);
        // console.log(notSections);
        // console.log(notSectionsContainsAbba);
        console.log(`${row} - ${supportsTls} / ${supportsSsl}`)

        if (supportsTls) {
            supportsTlsCount++;
        }

        if (supportsSsl) {
            supportsSslCount++;
        }
    }

    console.log('TLS: ' + supportsTlsCount);
    console.log('SSL: ' + supportsSslCount);
});

function orReducer(v, p) {
    return v || p;
}

function mergeReducer(v, p) {
    return v.concat(p);
}

function containsAbba(input) {
    // console.log(input);
    for (var i = 0; i < input.length - 3; i++) {
        var source = input.substr(i, 2);
        if (source[0] !== source[1]) {
            var target = input.substr(i + 2, 2);
            var search = source.split('').reverse().join('');
            if (target === search) {
                return true;
            }
        }
    }

    return false;
}

function getAbas(input) {
    var result = [];

    for (var i = 0; i < input.length - 2; i++) {
        if (input.substr(i, 1) === input.substr(i + 2, 1) && input.substr(i, 1) !== input.substr(i + 1, 1))  {
            result.push(input.substr(i, 3));
        }
    }

    return result;
}