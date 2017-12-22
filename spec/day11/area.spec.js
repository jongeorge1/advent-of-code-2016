let Area = require('../../src/day11/area');
let Floor = require('../../src/day11/floor');

describe('day 11 area module', () => {
  let sut;

  describe('when created', () => {
    beforeEach(() => {
      sut = new Area('The first floor contains a hydrogen-compatible microchip, and a lithium-compatible microchip.\r\nThe second floor contains a hydrogen generator.\r\nThe third floor contains a lithium generator.\r\nThe fourth floor contains nothing relevant.');
    });

    it('should contain the expected number of floors', () => {
      expect(sut.floors.length).toBe(4);
    });

    it('should have the elevator on the ground floor', () => {
      expect(sut.elevator).toBe(0);
    });

    it('should have the expected items on each floor', () => {
      expect(sut.floors[0].serialize()).toBe('1||hydrogen,lithium');
      expect(sut.floors[1].serialize()).toBe('2|hydrogen|');
      expect(sut.floors[2].serialize()).toBe('3|lithium|');
      expect(sut.floors[3].serialize()).toBe('4||');
    });
  });

  describe('when asked if is valid', () => {
    describe('and all floors are valid', () => {
      it('should return true', () => {
        sut = new Area();
        sut.floors.push(new Floor(1));
        sut.floors.push(new Floor(2));
        sut.floors.push(new Floor(3));

        expect(sut.isStateValid()).toBe(true);
      });
    });

    describe('and there is an invalid floor', () => {
      it('should return true', () => {
        sut = new Area();
        sut.floors.push(new Floor(1));
        sut.floors.push(new Floor(2));
        sut.floors.push(new Floor(3));

        spyOn(sut.floors[1], 'isStateValid').and.returnValue(false);

        expect(sut.isStateValid()).toBe(false);
      });
    });
  });

  describe('when asked to serialize the area state', () => {
    it('should return a string repesenting the floor state', () => {
      sut = new Area();
      sut.elevator = 1;
      sut.floors.push(new Floor(1));
      sut.floors.push(new Floor(2));
      sut.floors.push(new Floor(3));
      
      spyOn(sut.floors[0], 'serialize').and.returnValue('1|g|a');
      spyOn(sut.floors[1], 'serialize').and.returnValue('2|g|a');
      spyOn(sut.floors[2], 'serialize').and.returnValue('3|g|a');
    
      expect(sut.serialize()).toBe('1~1|g|a~2|g|a~3|g|a');
    });      
  })

  describe('when asked if the area represents a finish state', () => {
    describe('and all floors except the top are empty', () => {
      it('should return true', () => {
        sut = new Area();
        sut.elevator = 1;
        sut.floors.push(new Floor(1));
        sut.floors.push(new Floor(2));
        sut.floors.push(new Floor(3));

        sut.floors[2].addGenerators('a', 'b');
        sut.floors[2].addChips('a', 'b');

        expect(sut.isStateFinished).toBe(true);
      });
    });

    describe('and there is a non-top floor that is not empty', () => {
      it('should return false', () => {
        sut = new Area();
        sut.elevator = 1;
        sut.floors.push(new Floor(1));
        sut.floors.push(new Floor(2));
        sut.floors.push(new Floor(3));

        sut.floors[1].addGenerators('a', 'b');
        sut.floors[1].addChips('a', 'b');

        expect(sut.isStateFinished).toBe(false);

      });
    });
  });

  describe('when asked for possible moves', () => {
    describe('and the elevator is on the ground floor', () => {
      it('should return all the possible moves of one or two items up a level that result in a valid state for all floors', () => {
        sut = new Area();
        sut.floors.push(new Floor(1));
        sut.floors.push(new Floor(2));
        sut.floors.push(new Floor(3));

        sut.floors[0].addGenerators('b', 'c');
        sut.floors[0].addChips('c');

        let result = sut.getPossibleMoves();

        expect(result.length).toBe(4);
      });
    });

    describe('and the elevator is on the top floor', () => {
      it('should return all the possible moves of one or two items up a level that result in a valid state for all floors', () => {
        sut = new Area();
        sut.floors.push(new Floor(1));
        sut.floors.push(new Floor(2));
        sut.floors.push(new Floor(3));
        sut.elevator = 2;

        sut.floors[2].addGenerators('b', 'c');
        sut.floors[2].addChips('c');

        let result = sut.getPossibleMoves();

        expect(result.length).toBe(4);
      });
    });

    describe('and the elevator is on a middle floor', () => {
      it('should return all the possible moves of one or two items up a level that result in a valid state for all floors', () => {
        sut = new Area();
        sut.floors.push(new Floor(1));
        sut.floors.push(new Floor(2));
        sut.floors.push(new Floor(3));
        sut.elevator = 1;

        sut.floors[1].addGenerators('b', 'c');
        sut.floors[1].addChips('c');

        let result = sut.getPossibleMoves();

        expect(result.length).toBe(8);
      });
    });
  });
});