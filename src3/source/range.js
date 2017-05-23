'use strict';

const inherits = require('util').inherits;
const Generate = require('./generate');
const Chunk = require('../chunk');

module.exports = Range;
inherits(Range, Generate);

const endChunk = new Chunk.end();

function Range(start, end, step, async) {
  Generate.call(this, null, async);
  this.start = start = start || 0;
  this.endValue = end;
  this.step = step = step || 1;
  this.value = start - step;
}
Range.prototype.fn = function range(chunk) {
  this.value += this.step;
  if (this.endValue && this.value > this.endValue) this.ended = true;
  return this.value;
};
