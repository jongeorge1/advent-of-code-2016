require('fs').readFile('day6-input.txt', function (err, data) {

    var input = ("" + data).split('\r\n');

    var result = input[0].split('').map((col, i) => input.map(row => row[i])).map(sortByFrequency).reduce((p, c) => p + c[0], '');

    console.log(result);
});

function sortByFrequency(array) {
    var frequency = {};

    array.forEach(function(value) { frequency[value] = 0; });

    var uniques = array.filter(function(value) {
        return ++frequency[value] == 1;
    });

    return uniques.sort(function(a, b) {
        return frequency[b] - frequency[a];
    });
}