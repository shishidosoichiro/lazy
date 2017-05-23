'use strict';

const expect = require('chai').expect;

const Range = require('../src/source/range');

describe('range', () => {
  it('should count up from 0 with 1.', () => {
    const range = new Range();
    const iterator = range.iterator();
    var chunk = iterator.next();
    expect(chunk.data).to.equal(0);
    expect(chunk.index).to.equal(0);
    chunk = iterator.next();
    expect(chunk.data).to.equal(1);
    expect(chunk.index).to.equal(1);
    chunk = iterator.next();
    expect(chunk.data).to.equal(2);
    expect(chunk.index).to.equal(2);
  });
  it('should count up from "start" value with 1.', () => {
    const range = new Range(2);
    const iterator = range.iterator();
    var chunk = iterator.next();
    expect(chunk.data).to.equal(2);
    expect(chunk.index).to.equal(0);
    chunk = iterator.next();
    expect(chunk.data).to.equal(3);
    expect(chunk.index).to.equal(1);
    chunk = iterator.next();
    expect(chunk.data).to.equal(4);
    expect(chunk.index).to.equal(2);
  });
  it('should count up from "start" value with "step" value.', () => {
    const range = new Range(2, false, 5);
    const iterator = range.iterator();
    var chunk = iterator.next();
    expect(chunk.data).to.equal(2);
    expect(chunk.index).to.equal(0);
    chunk = iterator.next();
    expect(chunk.data).to.equal(7);
    expect(chunk.index).to.equal(1);
    chunk = iterator.next();
    expect(chunk.data).to.equal(12);
    expect(chunk.index).to.equal(2);
  });
  it('should count up from "start" value to end with "step" value.', () => {
    const range = new Range(2, 8, 5);
    const iterator = range.iterator();
    var chunk = iterator.next();
    expect(chunk.data).to.equal(2);
    expect(chunk.index).to.equal(0);
    chunk = iterator.next();
    expect(chunk.data).to.equal(7);
    expect(chunk.index).to.equal(1);
    chunk = iterator.next();
    expect(chunk.end).to.be.true;
  });
});
