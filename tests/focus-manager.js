var expect = chai.expect;

describe('FocusManager', function () {
  beforeEach(function () {
    fm = new FocusManager();
    fm.setMax(5);
  });

  describe('#get()', function () {
    it('Should be 0 by default', function () {
      expect(fm.get()).to.equal(0);
    });
    it('Should represent current focus point', function () {
      fm.set(1);
      expect(fm.get()).to.equal(1);
      fm.set(4);
      expect(fm.get()).to.equal(4);
    });
  });

  describe('#set()', function () {
    it('Should change current focus point', function () {
      fm.set(0);
      expect(fm.get()).to.equal(0);
      fm.set(4);
      expect(fm.get()).to.equal(4);
    });
    it('Should set negative numbers to 0', function () {
      fm.set(-1);
      expect(fm.get()).to.equal(0);
    });
    it('Should become max if number larger than max', function () {
      fm.set(8);
      expect(fm.get()).to.equal(5);
    });
  });

  describe('#setMax()', function () {
    it('Should change upper max focus point', function () {
      fm.setMax(17);
      fm.set(18);
      expect(fm.get()).to.equal(17);
    });
    it('Should decrease current focus if less than current', function () {
      fm.set(5)
      fm.setMax(4);
      expect(fm.get()).to.equal(4);
    });
  });

  describe('#getMax()', function () {
    it('Should return the maximum focus point', function () {
      expect(fm.getMax()).to.equal(5);
    });
  });

  describe('#next()', function () {
    it('Should increase focus point by 1', function () {
      fm.next();
      expect(fm.get()).to.equal(1);
      fm.next();
      expect(fm.get()).to.equal(2);
    });
    it('Should not exceed max', function () {
      fm.set(5);
      fm.next();
      expect(fm.get()).to.equal(5);
    });
  });

  describe('#prev()', function () {
    it('Should decrease focus point by 1', function () {
      fm.set(5);
      fm.prev();
      expect(fm.get()).to.equal(4);
      fm.prev();
      expect(fm.get()).to.equal(3);
    });
    it('Should not go lower than 0', function () {
      fm.prev();
      expect(fm.get()).to.equal(0);
    });
  });

});
