let Bot = require('./bot');
let Output = require('./output');

class Day10Part2 {
  constructor() {
    this.allocationRegex = /value (\d+)[\w\s]+ (\d+)/;
    this.instructionRegex = /bot (\d+) gives low to (\w+) (\d+) and high to (\w+) (\d+)/;

    this.bots = [];
    this.outputs = [];
  }

  process(input) {
    let commands = input.split('\r\n');

    for (let i = 0; i < commands.length; i++) {
      if (commands[i].startsWith('value')) {
        let match = this.allocationRegex.exec(commands[i]);
        this.addValueToBot(+match[2], +match[1]);
      } else {
        let match = this.instructionRegex.exec(commands[i]);
        this.addInstructionToBot(+match[1], match[2], +match[3], match[4], +match[5]);
      }
    }

    let doneSome = true;
    let target = null;

    while (doneSome) {
      doneSome = false;

      for (let x = 0; x < this.bots.length; x++) {
        let bot = this.bots[x];
        if (bot) {
          if (bot.canExecute()) {
            bot.execute();
            doneSome = true;
          }
        }
      }
    }

    return this.outputs[0].value * this.outputs[1].value * this.outputs[2].value;
  }

  addValueToBot(bot, val) {
    this.getBot(bot).setValue(val);
  }

  getBot(bot) {
    this.bots[bot] = this.bots[bot] || new Bot(bot);
    return this.bots[bot];
  }

  getOutput(output) {
    this.outputs[output] = this.outputs[output] || new Output(output);
    return this.outputs[output];
  }

  addInstructionToBot(botNumber, lowType, lowNumber, highType, highNumber) {
    let bot = this.getBot(botNumber);

    bot.setLowDestination(this.getDestination(lowType, lowNumber));
    bot.setHighDestination(this.getDestination(highType, highNumber));
  }

  getDestination(type, num) {
    return (type === 'bot') ? this.getBot(num) : this.getOutput(num);
  }
}

module.exports = Day10Part2;