'use strict';

module.exports = Range;

const inherits = require('util').inherits;
const Generate = require('./generate');
const Chunk = require('../chunk');

inherits(Range, Generate);

const endChunk = new Chunk.end();

function Range(start, end, step, async) {
  Generate.call(this, null, async);
  this.start = start = start || 0;
  this.endValue = end;
  this.step = step = step || 1;
}


Range.Iterator = Iterator;
inherits(Iterator, Generate.Iterator);

function Iterator(factory) {
  Generate.Iterator.call(this, factory);
  this.start = factory.start;
  this.endValue = factory.endValue;
  this.step = factory.step;
  this.value = this.start - this.step;
}
Iterator.prototype.fn = function range() {
  this.value += this.step;
  if (this.endValue && this.value > this.endValue) this.ended = true;
  return this.value;
};
