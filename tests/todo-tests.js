var expect = chai.expect;

describe('Todo', function () {
  var todo;

  describe('#id()', function () {
    beforeEach(function () {
      todo = new Todo('Watch TV');
    });
    it('Should return an MD5 hash', function () {
      expect(todo.id()).to.have.length(32);
    });
  });

  describe('#text()', function () {
    beforeEach(function () {
      todo = new Todo('Watch TV');
    });
    it('Should return the item’s text', function () {
      expect(todo.text()).to.equal('Watch TV');
    });
    it('Should set new text', function () {
      todo.text('Read');
      expect(todo.text()).to.equal('Read');
    });
  });

  describe('#mark()', function () {
    beforeEach(function () {
      todo = new Todo('Watch TV');
    });
    it('Should mark item as complete', function () {
      todo.mark();
      expect(todo.text()).to.equal('x Watch TV');
    });
  });

  describe('#unmark()', function () {
    beforeEach(function () {
      todo = new Todo('Watch TV');
      todo.mark();
    });
    it('Should mark item as incomplete', function () {
      todo.unmark();
      expect(todo.text()).to.equal('Watch TV');
    });
  });

  describe('#isMarked()', function () {
    beforeEach(function () {
      todo = new Todo('Watch TV');
    });
    it('Should return false when item is not marked', function () {
      expect(todo.isMarked()).to.be.false;
    });
    it('Should return true when item is marked', function () {
      todo.mark();
      expect(todo.isMarked()).to.be.true;
    });
  });

  describe('#toggle()', function () {
    beforeEach(function () {
      todo = new Todo('Watch TV');
    });
    it('Should mark item as complete then incomplete', function () {
      todo.toggle();
      expect(todo.text()).to.equal('x Watch TV');
      todo.toggle();
      expect(todo.text()).to.equal('Watch TV');
    });
  });

});
