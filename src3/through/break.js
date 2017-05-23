'use strict';

const inherits = require('util').inherits;
const Through = require('./through');

module.exports = Break;
inherits(Break, Through);

function Break(fn, async) {
  Through.call(this);
  this.fn = this.fn || fn;
  this.async = async;
  this.ended = false;
}
Break.prototype.read = function read(chunk) {
  if (this.ended) {
    chunk.end = true;
    return chunk;
  }
  this.ended = !this.fn(chunk.data, chunk.index);
  if (this.ended) chunk.end = true;
  return chunk;
};
