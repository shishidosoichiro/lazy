'use strict';

const inherits = require('util').inherits;
const Generate = require('./generate');
const Chunk = require('./chunk');

module.exports = Range;
inherits(Range, Generate);

function Range(start, step, async) {
  Generate.call(this, range, async);
  this.start = start = start || 0;
  this.step = step = step || 1;
  this.value = start - step;
}
const endChunk = new Chunk.end();
function range(){
  const value = this.value = this.value + this.step;
  return value;
}
