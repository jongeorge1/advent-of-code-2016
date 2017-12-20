require('string.prototype.padstart').shim();
let Stopwatch = require('node-stopwatch').Stopwatch;

let day = ('' + process.argv[2]).padStart(2, '0');
let part = process.argv[3];

let Target = require(`./src/day${day}/part${part}`);
let target = new Target();
let input = process.argv[2];

let data = require('fs').readFileSync(`./src/day${day}/input.txt`);

let timer = Stopwatch.create();
timer.start();
let result = target.process('' + data);
timer.stop();

console.log(`Completed in ${timer.elapsedMilliseconds}ms`);
console.log(result);