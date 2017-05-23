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

function Iterator(factory) {
  this.factory = factory;
  this.fn = this.fn || factory.fn;
  this.ended = false;
}
Iterator.prototype.next = function next(chunk) {
  if (this.ended) {
    chunk.end = true;
    return chunk;
  }
  this.ended = !this.fn(chunk.data, chunk.index);
  if (this.ended) chunk.end = true;
  return chunk;
};
