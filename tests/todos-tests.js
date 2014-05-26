var expect = chai.expect;

describe('Todos', function () {
  var todos,
    getRawData = function () { return ['Watch TV', 'Read', 'Code', 'Walk Dog']; }
  ;

  beforeEach(function () {
    todos = new Todos();
  });

  describe('#populate()', function () {
    it('Should be empty by default', function () {
      expect(todos.getAll()).to.be.empty;
    });
    it('Should populate the todo list', function () {
      todos.populate(getRawData());
      expect(todos.getAll()).to.have.length(4);
    });
  });

  describe('#length()', function () {
    it('Should be 0 by default', function () {
      expect(todos.length()).to.equal(0);
    });
    it('Should match length of items in collection', function () {
      todos.populate(getRawData());
      expect(todos.length()).to.equal(4);
    });
  });

  describe('#addAt()', function () {
    beforeEach(function () {
      todos.populate(getRawData());
    });
    it('Should accept a single string argument and prepend', function () {
      todos.addAt('Prepend');
      expect(todos.getByIndex(0).text()).to.equal('Prepend');
    });
    it('Should accept a 0 position argument and prepend', function () {
      todos.addAt('Prepend', 0);
      expect(todos.getByIndex(0).text()).to.equal('Prepend');
    });
    it('Should accept a -1 position and append', function () {
      todos.addAt('Append', -1);
      expect(todos.getByIndex(todos.getAll().length - 1).text()).to.equal('Append');
    });
    // it('Should throw error for integers less than -1', function () {
    //   expect(todos.addAt('Append', -2)).to.throw(Error);
    // });
    it('Should accept position integer larger than length and append', function () {
      todos.addAt('Append', 18);
      expect(todos.getByIndex(todos.getAll().length - 1).text()).to.equal('Append');
    });
    it('Should accept a positive position integer to splice', function () {
      todos.addAt('Inside 0', 0);
      todos.addAt('Inside 1', 2);
      todos.addAt('Inside 2', 4);
      expect(todos.getAll()).to.have.length(7);
      expect(todos.getByIndex(0).text()).to.equal('Inside 0');
      expect(todos.getByIndex(2).text()).to.equal('Inside 1');
      expect(todos.getByIndex(4).text()).to.equal('Inside 2');
    });
    it('Should accept a Todo object instead of a string', function () {
      todos.addAt(todos.getByIndex(2));
      expect(todos.getByIndex(0).text()).to.equal('Code');
    });
  });

  describe('#append()', function () {
    beforeEach(function () {
      todos.populate(getRawData());
    });
    it('Should append item', function () {
      todos.append('Append');
      expect(todos.getByIndex(todos.getAll().length - 1).text()).to.equal('Append');
    });
  });

  describe('#prepend()', function () {
    beforeEach(function () {
      todos.populate(getRawData());
    });
    it('Should prepend item', function () {
      todos.prepend('Prepend');
      expect(todos.getByIndex(0).text()).to.equal('Prepend');
    });
  });

  describe('#get()', function () {
    beforeEach(function () {
      todos.populate(getRawData());
    });
    it('Should get single item', function () {
      expect(todos.get(todos.getByIndex(0).id()).text()).to.equal('Watch TV');
      expect(todos.get(todos.getByIndex(2).id()).text()).to.equal('Code');
    });
  });

  describe('#getByIndex()', function () {
    beforeEach(function () {
      todos.populate(getRawData());
    });
    it('Should get single item', function () {
      expect(todos.getByIndex(0).text()).to.equal('Watch TV');
      expect(todos.getByIndex(2).text()).to.equal('Code');
    });
  });

  describe('#getAll()', function () {
    beforeEach(function () {
      todos.populate(getRawData());
    });
    it('Should get all items', function () {
      expect(todos.getAll()).to.have.length(4);
    });
  });

  describe('#remove()', function () {
    beforeEach(function () {
      todos.populate(getRawData());
    });
    it('Should delete a single item', function () {
      todos.remove(todos.getByIndex(0).id());
      expect(todos.getAll()).to.have.length(3);
      expect(todos.getByIndex(0).text()).to.equal('Read');
    });
  });

  describe('#removeByIndex()', function () {
    beforeEach(function () {
      todos.populate(getRawData());
    });
    it('Should delete a single item', function () {
      todos.removeByIndex(0);
      expect(todos.getAll()).to.have.length(3);
      expect(todos.getByIndex(0).text()).to.equal('Read');
    });
  });

});
