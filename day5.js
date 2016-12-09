var md5 = require("md5");
var sw = require("node-stopwatch").Stopwatch;

part2();

function part1() {
    var current = 1;
    var key = "uqwqemis";

    var passcode = '';

    var stopwatch = sw.create();

    stopwatch.start();
    do {
        var hash = md5(key + current);
        if (hash.indexOf("00000") === 0) {
            passcode += hash[5];
            console.log(`${current} -> ${hash} -> ${hash[5]}`);
        }
        current++;
    } while (passcode.length < 8);

    stopwatch.stop();

    console.log("Answer is " + passcode + ", took " + stopwatch.elapsed.milliseconds);
}

function part2() {
    var current = 1;
    var key = "uqwqemis";

    var passcode = [];
    var count = 0;

    var stopwatch = sw.create();

    stopwatch.start();
    do {
        var hash = md5(key + current);
        if (hash.indexOf("00000") === 0) {
            var pos = parseInt(hash[5]);
            if (!isNaN(pos) && pos >= 0 && pos < 8 && !passcode[pos]) {
                passcode[pos] = hash[6];
                count++;
                console.log(`${current} -> ${hash} -> ${hash[6]} in pos ${hash[5]}`);
            }
        }
        current++;
    } while (count < 8);

    stopwatch.stop();

    console.log("Answer is " + passcode.join('') + ", took " + stopwatch.elapsed.milliseconds);
}
