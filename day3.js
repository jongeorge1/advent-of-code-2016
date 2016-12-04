require('fs').readFile('day3-input.txt', function (err, data) {
    var input = ("" + data);
    console.log('Part 1: ' + input.split('\r\n').map(c => c.split(/\s+/).slice(1).map(x => +x).sort((a, b) => a - b).reduce((a, v, i) => i === 2 ? a > v : a + v)).reduce((a, v) => v ? a + 1 : a));

    var regex = /\s*(\d+)\s*(\d+)\s*(\d+)\s*(\d+)\s*(\d+)\s*(\d+)\s*(\d+)\s*(\d+)\s*(\d+)/g;
    var match;
    var total = 0;
    while (match = regex.exec(input)) {
        // Rework the array
        var a = [];
        for (var i = 1; i < 4; i++) {
            a.push([+match[i], +match[i + 3], +match[i + 6]].sort((a, b) => a - b).reduce((a, v, i) => i === 2 ? a > v : a + v));
        }
        total += a.reduce((a, v) => v ? a + 1 : a);
    }

    console.log('Part 2: ' + total);
});

