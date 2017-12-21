let Floor = require('../../src/day11/floor');

describe('day 11 floor module', () => {
  let sut;

  describe('when created', () => {
    // describe('with generators and chips', () => {
    //   beforeEach(() => {
    //     sut = new Floor(2, 'The second floor contains a thulium generator, a ruthenium generator, a ruthenium-compatible microchip, a curium generator, and a curium-compatible microchip.')
    //   });

    //   it('should parse the floor number correctly', () => {
    //     expect(sut.level).toBe(2);
    //   });

    //   it('should parse the generators correctly', () => {
    //     expect(sut.generators).toEqual(['thulium', 'ruthenium', 'curium']);
    //   });

    //   it('should parse the chips correctly', () => {
    //     expect(sut.chips).toEqual(['ruthenium', 'curium']);
    //   });
    // });

    describe('with only chips', () => {
      beforeEach(() => {
        sut = new Floor(2, 'The first floor contains a hydrogen-compatible microchip, and a lithium-compatible microchip.');
      });

      it('should parse the floor number correctly', () => {
        expect(sut.level).toBe(2);
      });

      it('should contain no generators', () => {
        expect(sut.generators).toEqual([]);
      });

      it('should parse the chips correctly', () => {
        expect(sut.chips).toEqual(['hydrogen', 'lithium']);
      });
    });

    describe('with no items', () => {
      beforeEach(() => {
        sut = new Floor(2, 'The fourth floor contains nothing relevant.');
      });

      it('should parse the floor number correctly', () => {
        expect(sut.level).toBe(2);
      });

      it('should contain no generators', () => {
        expect(sut.generators).toEqual([]);
      });

      it('should contain no chips', () => {
        expect(sut.chips).toEqual([]);
      });
    });
  });

  describe('when asked to serialize the floor state', () => {
    it('should return a string repesenting the floor state', () => {
      sut = new Floor(1);
      sut.addGenerators('c', 'b', 'a');
      sut.addChips('b', 'a');
      expect(sut.serialize()).toBe('1|a,b,c|a,b');
    });
  });

  describe('when asked if the floor state is valid', () => {
    describe('and the elevator is not present', () => {
      describe('and there are no generators or chips', () => {
        it('should return true', () => {
          sut = new Floor(1);
          expect(sut.isStateValid()).toBe(true);
        });
      });

      describe('and there are chips but no generators', () => {
        it('should return true', () => {
          sut = new Floor(1);
          sut.addChips('b', 'a');
          expect(sut.isStateValid()).toBe(true);
        });
      });

      describe('and there are generators but no chips', () => {
        it('should return true', () => {
          sut = new Floor(1);
          sut.addGenerators('a', 'b');
          expect(sut.isStateValid()).toBe(true);
        });
      });

      describe('and there are both chips and generators', () => {
        describe('and all chips have their matching generators', () => {
          it('should return true', () => {
            sut = new Floor(1);
            sut.addGenerators('a', 'b', 'c');
            sut.addChips('a', 'b');
            expect(sut.isStateValid()).toBe(true);
          });
        });

        describe('and there is a chip without its matching generator', () => {
          it('should return false', () => {
            sut = new Floor(1);
            sut.addGenerators('a', 'b');
            sut.addChips('a', 'b', 'c');
            expect(sut.isStateValid()).toBe(false);
          });
        });
      });
    });
  });
});