const expect = require('chai').expect;

const Chunk = require('../src/chunk');

describe('chunk', () => {
  it('should create a chunk with data.', () => {
    const chunk = new Chunk('a', 0);
    expect(chunk.data).to.equal('a');
    expect(chunk.index).to.equal(0);
    expect(chunk.next).to.be.false;
    expect(chunk.end).to.be.false;
  })
  it('should create a chunk with "next" flag.', () => {
    const chunk = new Chunk('b', 1, true);
    expect(chunk.data).to.equal('b');
    expect(chunk.index).to.equal(1);
    expect(chunk.next).to.be.true;
    expect(chunk.end).to.be.false;
  })
  it('should create a chunk with "end" flag.', () => {
    const chunk = new Chunk('c', 2, undefined, true);
    expect(chunk.data).to.equal('c');
    expect(chunk.index).to.equal(2);
    expect(chunk.next).to.be.false;
    expect(chunk.end).to.be.true;
  })
  describe('#create', () => {
    it('should create a chunk without "new" operator.', () => {
      const chunk = Chunk.create('d', 3);
      expect(chunk.data).to.equal('d');
      expect(chunk.index).to.equal(3);
      expect(chunk.next).to.be.false;
      expect(chunk.end).to.be.false;
    })
    it('should return the first param, if the param is chunk.', () => {
      const chunk = Chunk.create(new Chunk('e', 4, true, true));
      expect(chunk.data).to.equal('e');
      expect(chunk.index).to.equal(4);
      expect(chunk.next).to.be.true;
      expect(chunk.end).to.be.true;
    })
  })
  describe('#next', () => {
    it('should return chunk which be set true to "next" flag of.', () => {
      const chunk = Chunk.next('a', 5);
      expect(chunk.data).to.equal('a');
      expect(chunk.index).to.equal(5);
      expect(chunk.next).to.be.true;
      expect(chunk.end).to.be.false;
    })
  })
  describe('#end', () => {
    it('should return chunk which be set true to "end" flag of.', () => {
      const chunk = Chunk.end('b', 6);
      expect(chunk.data).to.equal('b');
      expect(chunk.index).to.equal(6);
      expect(chunk.next).to.be.false;
      expect(chunk.end).to.be.true;
    })
  })
})
