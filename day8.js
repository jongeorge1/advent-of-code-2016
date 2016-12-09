// COmmands:
// - rect
// - rotate row
// - rotate column

require('fs').readFile('day8-input.txt', function (err, data) {
    var input = ("" + data).split('\r\n');
    var regex = /(\d+)(x| by )(\d+)/;
    var height = 6;
    var width = 50;

    var matrix = [];

    for (var i = 0; i < height; i++) {
        var row = new Array(width);
        row.fill(false);
        matrix.push(row);
    }
    
    for (var i = 0; i < input.length; i++) {
        console.log(input[i]);
        var match = regex.exec(input[i]);
        console.log(match);
        if (input[i].startsWith('rotate row')) {
            rotateRow(+match[1], +match[3]);
        } else if (input[i].startsWith('rotate column')) {
            rotateColumn(+match[1], +match[3])
        } else {
            rect(+match[1], +match[3])
        }
    
        drawDisplay();
    }

    // drawDisplay();

    countLeds();

    function drawDisplay() {
        for (var i = 0; i < matrix.length; i++) {
            console.log(matrix[i].reduce((p, c) => p + (c ? '#' : '.'), ''));
        }

        console.log();
    }

    function countLeds() {
        console.log(matrix.map(x => x.reduce((p, c) => p + (c ? 1 : 0), 0)).reduce((p, c) => p + c, 0));
    }

    function rotateColumn(x, count) {
    }

    function rotateRow(y, count) {
        console.log('rotating row ' + y + ' by ' + count);
        var row = matrix[y];
        var lastFew = row.splice(-count, count);
        lastFew.splice(0, 0, 0, 0);
        row.splice.apply(row, lastFew);
    }

    function rotateColumn(x, count) {
        console.log('rotating column ' + x + ' by ' + count);
        // Manky solution, repeatedly rotate by 1
        for (var i = 0; i < count; i++) {
            var last = matrix[height - 1][x];

            for (var j = height; --j; j > 0) {
                matrix[j][x] = matrix[j - 1][x];
            }

            matrix[0][x] = last;
        }
    }

    function rect(x, y) {
        console.log('adding rect ' + x + ' by ' + y);
        for (var i = 0; i < y; i++) {
            for (var j = 0; j < x; j++) {
                matrix[i][j] = true;
            }
        }
        
    }
});