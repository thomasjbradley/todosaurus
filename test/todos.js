var expect = chai.expect;

describe('Todos', function () {
  var todos,
    getData = function () { return ['Watch TV', 'Read', 'Code', 'Walk Dog']; }
  ;

  beforeEach(function () {
    todos = new Todos();
  });

  describe('#populate()', function () {
    it('Should be empty by default', function () {
      expect(todos.getAll()).to.be.empty;
    });
    it('Should populate the todo list', function () {
      todos.populate(getData());
      expect(todos.getAll()).to.eql(getData());
    });
  });

  describe('#getAll()', function () {
    beforeEach(function () {
      todos.populate(getData());
    });
    it('Should get all item', function () {
      expect(todos.getAll()).to.eql(getData());
    });
  });

  describe('#get()', function () {
    beforeEach(function () {
      todos.populate(getData());
    });
    it('Should get single item', function () {
      expect(todos.get(0)).to.be.equal('Watch TV');
      expect(todos.get(2)).to.be.equal('Code');
    });
  });

  describe('#addAt()', function () {
    beforeEach(function () {
      todos.populate(getData());
    });
    it('Should accept a single argument and prepend', function () {
      todos.addAt('Prepend');
      expect(todos.get(0)).to.be.equal('Prepend');
    });
    it('Should accept a 0 argument and prepend', function () {
      todos.addAt('Prepend', 0);
      expect(todos.get(0)).to.be.equal('Prepend');
    });
    it('Should accept a -1 and append', function () {
      todos.addAt('Append', -1);
      expect(todos.getAll()[todos.getAll().length - 1]).to.be.equal('Append');
    });
    // it('Should throw error for integers less than -1', function () {
    //   expect(todos.addAt('Append', -2)).to.throw(Error);
    // });
    it('Should accept integer larger than length and append', function () {
      todos.addAt('Append', 18);
      expect(todos.getAll()[todos.getAll().length - 1]).to.be.equal('Append');
    });
    it('Should accept a positive integer to splice', function () {
      todos.addAt('Inside 0', 0);
      todos.addAt('Inside 1', 2);
      todos.addAt('Inside 2', 4);
      expect(todos.getAll()).to.have.length(7);
      expect(todos.get(0)).to.be.equal('Inside 0');
      expect(todos.get(2)).to.be.equal('Inside 1');
      expect(todos.get(4)).to.be.equal('Inside 2');
    });
  });

  describe('#prepend()', function () {
    beforeEach(function () {
      todos.populate(getData());
    });
    it('Should prepend item', function () {
      todos.prepend('Prepend');
      expect(todos.get(0)).to.be.equal('Prepend');
    });
  });

  describe('#append()', function () {
    beforeEach(function () {
      todos.append(getData());
    });
    it('Should append item', function () {
      todos.append('Append');
      expect(todos.getAll()[todos.getAll().length - 1]).to.be.equal('Append');
    });
  });

  describe('#updateAt()', function () {
    beforeEach(function () {
      todos.populate(getData());
    });
    it('Should replace the content', function () {
      todos.updateAt('Cook', 1);
      expect(todos.get(1)).to.be.equal('Cook');
    });
  });

  describe('#remove()', function () {
    beforeEach(function () {
      todos.populate(getData());
    });
    it('Should delete a single item', function () {
      todos.remove(0);
      expect(todos.getAll()).to.have.length(3);
      expect(todos.get(0)).to.be.equal('Read');
    });
  });

  describe('#mark()', function () {
    beforeEach(function () {
      todos.populate(getData());
    });
    it('Should mark item as complete', function () {
      todos.mark(0);
      expect(todos.get(0)).to.be.equal('x Watch TV');
    });
  });

  describe('#unmark()', function () {
    beforeEach(function () {
      todos.populate(getData());
      todos.mark(0);
    });
    it('Should mark item as incomplete', function () {
      todos.unmark(0);
      expect(todos.get(0)).to.be.equal('Watch TV');
    });
  });

  describe('#toggle()', function () {
    beforeEach(function () {
      todos.populate(getData());
    });
    it('Should mark item as complete then incomplete', function () {
      todos.toggle(0);
      expect(todos.get(0)).to.be.equal('x Watch TV');
      todos.toggle(0);
      expect(todos.get(0)).to.be.equal('Watch TV');
    });
  });

  describe('#filter()', function () {
    beforeEach(function () {
      todos.populate(getData());
    });
  });

});
