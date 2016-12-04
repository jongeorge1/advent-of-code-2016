"use strict"

var fs = require('fs');
var _ = require('lodash');

fs.readFile(process.argv[2], function (err, data) {
    var commands = ("" + data).split('\r\n');

    let part1Result = part1(commands);

    console.log('Code is ' + part1Result);

    let part2Result = part2(commands);

    console.log('Code is ' + part2Result);
});

function part1(commands) {
    let grid = [
        ['1', '2', '3'],
        ['4', '5', '6'],
        ['7', '8', '9'],
    ];

    let result = '';
    let startPos = { x: 1, y: 1 };

    let processCommand = function(startAt, command) {
        var pos = startAt;

        for (var i = 0; i < command.length; i++) {
            pos = processStep(pos, command[i]);
        }

        return pos;
    }

    let numberAt = function(pos) {
        return grid[pos.y][pos.x];
    }

    let processStep = function(startAt, step) {
        var stepResult; 

        if (step === 'U' && startAt.y > 0) {
            stepResult = { x: startAt.x, y: startAt.y - 1 };
        } else if (step === 'D' && startAt.y < 2) {
            stepResult = { x: startAt.x, y: startAt.y + 1 };
        } else if (step === 'L' && startAt.x > 0) {
            stepResult = { x: startAt.x - 1, y: startAt.y };
        } else if (step === 'R' && startAt.x < 2) {
            stepResult = { x: startAt.x + 1, y: startAt.y };
        }

        return stepResult || startAt;
    }

    for (var i = 0; i < commands.length; i++) {
        var numberPos = processCommand(startPos, commands[i]);
        result += numberAt(numberPos);

        startPos = numberPos;
    }

    return result;
}

function part2(commands) {
    let grid = [
        [null, null, '1', null, null],
        [null, '2', '3', '4', null],
        ['5', '6', '7', '8', '9'],
        [null, 'A', 'B', 'C', null],
        [null, null, 'D', null, null]
    ];

    let result = '';
    let startPos = { x: 0, y: 2 };

    let processCommand = function(startAt, command) {
        var pos = startAt;

        for (var i = 0; i < command.length; i++) {
            pos = processStep(pos, command[i]);
        }

        return pos;
    }

    let numberAt = function(pos) {
        return grid[pos.y][pos.x];
    }

    let processStep = function(startAt, step) {
        var stepResult; 

        if (step === 'U' && startAt.y > 0) {
            stepResult = { x: startAt.x, y: startAt.y - 1 };
        } else if (step === 'D' && startAt.y < 4) {
            stepResult = { x: startAt.x, y: startAt.y + 1 };
        } else if (step === 'L' && startAt.x > 0) {
            stepResult = { x: startAt.x - 1, y: startAt.y };
        } else if (step === 'R' && startAt.x < 4) {
            stepResult = { x: startAt.x + 1, y: startAt.y };
        }

        if (stepResult && numberAt(stepResult) == null) {
            stepResult = null;
        }

        return stepResult || startAt;
    }

    for (var i = 0; i < commands.length; i++) {
        var numberPos = processCommand(startPos, commands[i]);
        result += numberAt(numberPos);

        startPos = numberPos;
    }

    return result;}
