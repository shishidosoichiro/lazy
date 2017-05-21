'use strict';

const expect = require('chai').expect;

const Range = require('../src/source/range');

describe('range', () => {
  it('should count up from 0 with 1.', () => {
    const range = new Range();
    var chunk = range.read();
    expect(chunk.data).to.equal(0);
    expect(chunk.index).to.equal(0);
    chunk = range.read();
    expect(chunk.data).to.equal(1);
    expect(chunk.index).to.equal(1);
    chunk = range.read();
    expect(chunk.data).to.equal(2);
    expect(chunk.index).to.equal(2);
  });
  it('should count up from "start" value with 1.', () => {
    const range = new Range(2);
    var chunk = range.read();
    expect(chunk.data).to.equal(2);
    expect(chunk.index).to.equal(0);
    chunk = range.read();
    expect(chunk.data).to.equal(3);
    expect(chunk.index).to.equal(1);
    chunk = range.read();
    expect(chunk.data).to.equal(4);
    expect(chunk.index).to.equal(2);
  });
  it('should count up from "start" value with "step" value.', () => {
    const range = new Range(2, false, 5);
    var chunk = range.read();
    expect(chunk.data).to.equal(2);
    expect(chunk.index).to.equal(0);
    chunk = range.read();
    expect(chunk.data).to.equal(7);
    expect(chunk.index).to.equal(1);
    chunk = range.read();
    expect(chunk.data).to.equal(12);
    expect(chunk.index).to.equal(2);
  });
  it('should count up from "start" value to end with "step" value.', () => {
    const range = new Range(2, 8, 5);
    var chunk = range.read();
    expect(chunk.data).to.equal(2);
    expect(chunk.index).to.equal(0);
    chunk = range.read();
    expect(chunk.data).to.equal(7);
    expect(chunk.index).to.equal(1);
    chunk = range.read();
    expect(chunk.end).to.be.true;
  });
});
