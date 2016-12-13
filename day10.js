"use strict"

let allocationRegex = /value (\d+)[\w\s]+ (\d+)/;
let instructionRegex = /bot (\d+) gives low to (\w+) (\d+) and high to (\w+) (\d+)/;

let bots = [];
let outputs = [];

function Bot(num) {
    this.name = 'Bot ' + num;
    this.values = [];
    this.lowDestination = null;
    this.highDestination = null;
    this.executed = false;
}

Bot.prototype.setValue = function (val) {
    this.values.push(val);
}

Bot.prototype.setLowDestination = function(dest) {
    this.lowDestination = dest;
}

Bot.prototype.setHighDestination = function(dest) {
    this.highDestination = dest;
}

Bot.prototype.destinationCount = function() {
    return (this.lowDestination ? 1 : 0) + (this.highDestination ? 1 : 0)
}

Bot.prototype.hasValues = function(low, high) {
    return this.lowValue() === low && this.highValue() === high;
}

Bot.prototype.canExecute = function() {
    return this.values.length === 2 && !this.executed;
}

Bot.prototype.lowValue = function() {
    return Math.min.apply(null, this.values);
}

Bot.prototype.highValue = function() {
    return Math.max.apply(null, this.values);
}

Bot.prototype.execute = function() {
    this.lowDestination.setValue(this.lowValue());
    this.highDestination.setValue(this.highValue());
    this.executed = true;
}

function Output(num) {
    this.name = 'Output ' + num;
    this.value = null;
}

Output.prototype.setValue = function (val) {
    this.value = val;
}

function addValueToBot(bot, val) {
    getBot(bot).setValue(val);
}

function getBot(bot) {
    bots[bot] = bots[bot] || new Bot(bot);
    return bots[bot];
}

function getOutput(output) {
    outputs[output] = outputs[output] || new Output(output);
    return outputs[output];
}

function addInstructionToBot(botNumber, lowType, lowNumber, highType, highNumber) {
    let bot = getBot(botNumber);

    bot.setLowDestination(getDestination(lowType, lowNumber));
    bot.setHighDestination(getDestination(highType, highNumber));
}

function getDestination(type, num) {
    return (type === 'bot') ? getBot(num) : getOutput(num);
}

require('fs').readFile("day10-input.txt", (err, data) => {
// require('fs').readFile("day10-sampleinput1.txt", (err, data) => {
    let commands = ("" + data).split('\r\n');
    
    for (let i = 0; i < commands.length; i++) {
        if (commands[i].startsWith('value')) {
            let match = allocationRegex.exec(commands[i]);
            addValueToBot(+match[2], +match[1]);
        } else {
            let match = instructionRegex.exec(commands[i]);
            addInstructionToBot(+match[1], match[2], +match[3], match[4], +match[5]);
        }
    }
    
    let doneSome = true;
    let target = null;
    
    while (doneSome) {
        console.log('Iteration starting');
        doneSome = false;
        
        for (let x = 0; x < bots.length; x++) {
            let bot = bots[x];
            if (bot) {
                console.log(`bot ${x} has values ${(bot).values}, ${bot.destinationCount()} destination(s) and ${bot.canExecute() ? 'can' : 'can\'t'} execute`);
                
                if (bot.canExecute()) {
                    bot.execute();
                    doneSome = true;
                }
                
                if (!target && bot.hasValues(17, 61)) {
                    target = bot;
                }
            }
        }
        
        console.log('Iteration complete\n');
    }
    
    for (let x = 0; x < outputs.length; x++) {
        if (outputs[x]) {
            console.log(`output ${x} has value ${outputs[x].value}`);
        }
    }
    
    console.log(`${target.name} sorts value-17 and value-61 chips`);
    
    console.log('Product of chip values in outputs 0 - 2 is ' + (outputs[0].value * outputs[1].value * outputs[2].value))
});
