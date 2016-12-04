require('fs').readFile('day4-input.txt', function (err, data) {

    var input = ("" + data);
    var regex = /([a-z\-]+)-(\d+)\[([a-z]+)\]/g;
    var match;
    var total = 0;

    while (match = regex.exec(input)) {
        var counts = {};
        match[1].replace(/-/g, '').split('').sort().forEach(x => counts[x] = (counts[x] || 0) + 1);
        var expectedChecksum = Object.keys(counts).map(x => [x, counts[x]]).sort((a, b) => a[1] == b[1] ? (a[0].charCodeAt(0) - b[0].charCodeAt(0)) : b[1] - a[1]).slice(0, 5).reduce((a, c) => a + c[0], '');

        if (match[3] == expectedChecksum) {
            var sector = +match[2];
            total += sector;

            var name = match[1].split('').map(x => x === '-' ? ' ' : String.fromCharCode(((x.charCodeAt(0) + sector - 97) % 26) + 97)).join('');
            if (name.indexOf('north') >= 0) {
                console.log(name + ' - ' + sector);
            }
        }
    }

    console.log(total);
});
