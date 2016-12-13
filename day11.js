"use strict"

function Generator(element) {
    this.element = element;
}

function Microchip(element) {
    this.element = element;
}

function Floor(items) {
    this.items = items;
}

function State(liftPos, floors) {
    this.liftPos = liftPos,
    this.floors = floors
}

State.prototype.encode = function() {
    // Encode state as a string so we can compare it easily
}

State.prototype.isValid = function() {
    
}

State.prototype.isFinish = function () {
    
}

function buildInitialState(commands) {
    var generatorRegex = /a (\w+) generator/g;
    var chipRegex = /a (\w+)-compatible microchip/g;
    
    var floors = [];
    
    for (var i = 0; i < commands.length; i++) {
        var newFloor = buildInitialFloor(commands[i]);
        floors.push(newFloor);
    }
    
    return new State(0, floors);
}

function countMovesToComplete(state) {
    if (state.isFinish()) {
        return 0;
    }
    
    // 1. Build a list of all possible moves
    var possibleNewStates = [];
    
    // 2. Discard those that result in positions we've already seen
    
    // 3. Discard any that are invald
    
    // 4. Recurse on the list of new states - not all will lead to completion
    
    // 5. Return solution with smallest number of moves to completion
    
}

require('fs').readFile("day11-sampleinput1.txt", (err, data) => {
    let commands = ("" + data).split('\r\n');
    
    let state = buildInitialState(commands);
    
    let part1 = countMovesToComplete(state);
}
