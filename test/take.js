'use strict';

const expect = require('chai').expect;

const Take = require('../src/through/take');
const Chunk = require('../src/chunk');

describe('take', () => {
  it('should count up from 0 with 1.', () => {
    const take = new Take();
    var i = 0;
    var chunk;
    chunk = take.read(new Chunk('a', i++));
    expect(chunk.end).to.be.false;
    chunk = take.read(new Chunk('a', i++));
    expect(chunk.end).to.be.false;
    chunk = take.read(new Chunk('a', i++));
    expect(chunk.end).to.be.false;
    chunk = take.read(new Chunk('a', i++));
    expect(chunk.end).to.be.false;
    chunk = take.read(new Chunk('a', i++));
    expect(chunk.end).to.be.false;
    chunk = take.read(new Chunk('a', i++));
    expect(chunk.end).to.be.false;
    chunk = take.read(new Chunk('a', i++));
    expect(chunk.end).to.be.false;
    chunk = take.read(new Chunk('a', i++));
    expect(chunk.end).to.be.false;
    chunk = take.read(new Chunk('a', i++));
    expect(chunk.end).to.be.false;
    chunk = take.read(new Chunk('a', i++));
    expect(chunk.end).to.be.false;
    chunk = take.read(new Chunk('a', i++));
    expect(chunk.end).to.be.true;
    chunk = take.read(new Chunk('a', i++));
    expect(chunk.end).to.be.true;
    chunk = take.read(new Chunk('a', i++));
    expect(chunk.end).to.be.true;
  });
  it('should count up from "start" value with 1.', () => {
    const take = new Take(3);
    var i = 0;
    var chunk;
    chunk = take.read(new Chunk('a', i++));
    expect(chunk.data).to.equal('a');
    expect(chunk.index).to.equal(0);
    expect(chunk.end).to.be.false;
    chunk = take.read(new Chunk('a', i++));
    expect(chunk.data).to.equal('a');
    expect(chunk.index).to.equal(1);
    expect(chunk.end).to.be.false;
    chunk = take.read(new Chunk('a', i++));
    expect(chunk.data).to.equal('a');
    expect(chunk.index).to.equal(2);
    expect(chunk.end).to.be.false;
    chunk = take.read(new Chunk('a', i++));
    expect(chunk.data).to.equal('a');
    expect(chunk.index).to.equal(3);
    expect(chunk.end).to.be.true;
    chunk = take.read(new Chunk('a', i++));
    expect(chunk.end).to.be.true;
    chunk = take.read(new Chunk('a', i++));
    expect(chunk.end).to.be.true;
  });
});
