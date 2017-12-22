let Day11Part1 = require('../../src/day11/part1');

describe('day 11.1', () => {
  let sut;

  describe('the AoC test case', () => {
    it('should return the expected result', () => {
      sut = new Day11Part1();
      let result = sut.process('The first floor contains a hydrogen-compatible microchip, and a lithium-compatible microchip.\r\nThe second floor contains a hydrogen generator.\r\nThe third floor contains a lithium generator.\r\nThe fourth floor contains nothing relevant.');
      expect(result).toBe(11);
    });
  });
});