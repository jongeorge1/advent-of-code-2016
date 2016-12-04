var fs = require('fs');
var _ = require('lodash');

var north = 0;
var east = 0;

var direction = '0';
var visitedLocations = [[0, 0]];
var hq = null;

fs.readFile(process.argv[2], function (err, data) {
    var commands = ("" + data).split(', ');

    for (var i = 0; i < commands.length; i++) {
        var command = commands[i].trim();
        // Split into direction and distance
        var directionChange = command.substring(0, 1);
        var distance = +command.substr(1);

        // console.log(`Command ${i}: Direction change: ${directionChange}, Distance: ${distance}`)

        updateDirection(directionChange);
        addVisitedLocations(distance)

        // console.log(`new direction: ${direction}`)
    }

    var finalLocation = visitedLocations[visitedLocations.length - 1];
    var distance = Math.abs(finalLocation[0]) + Math.abs(finalLocation[1]);
    console.log(`Total distance: ${distance}`);

    var hqDistance = Math.abs(hq[0]) + Math.abs(hq[1]);
    console.log(`HQ is at: ${hq[0]}, ${hq[1]}, a distance of ${hqDistance}`);
});

function updateDirection(change) {
    if (change === 'R') {
        direction++;
    } else {
        direction--;
    }

    if (direction < 0) {
        direction = 3;
    } else if (direction > 3) {
        direction = 0;
    }
}

function checkForPreviousVisit() {
    if (hq === null) {
        var newLocation = visitedLocations[visitedLocations.length - 1];

        var previousVisit = _.find(visitedLocations, function (el) {
            return el[0] === newLocation[0] && el[1] === newLocation[1];
        });

        if (previousVisit && previousVisit !== newLocation) {
            hq = newLocation;
        }
    }
}

function addVisitedLocations(distance) {
    for (var i = 0; i < distance; i++) {
        var currentLocation = visitedLocations[visitedLocations.length - 1];
        var newLocation; 
        switch (direction) {
            case 0:
                newLocation = [currentLocation[0], currentLocation[1] + 1];
                break;

            case 1:
                newLocation = [currentLocation[0] + 1, currentLocation[1]];
                break;

            case 2:
                newLocation = [currentLocation[0], currentLocation[1] - 1];
                break;

            case 3:
                newLocation = [currentLocation[0] - 1, currentLocation[1]];
                break;
        }

        visitedLocations.push(newLocation);
        checkForPreviousVisit();
    }
}
