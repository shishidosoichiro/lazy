'use strict';

const inherits = require('util').inherits;
const Through = require('./through');

module.exports = Break;
inherits(Break, Through);

function Break(fn, async) {
  Through.call(this);
  this.fn = fn;
  this.async = async;
}


Break.Iterator = Iterator;
inherits(Iterator, Through.Iterator);

function Iterator(factory) {
  Through.Iterator.call(this);
  this.fn = this.fn || factory.fn;
  this.ended = false;
}
Iterator.prototype.next = function next(chunk) {
  if (!this.ended) this.ended = !this.fn(chunk.data, chunk.index);
  chunk.end = this.ended;
  return chunk;
};
