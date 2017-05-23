'use strict';

const inherits = require('util').inherits;
const Through = require('./through');

module.exports = Mapper;
inherits(Mapper, Through);

function Mapper(fn, async) {
  Through.call(this);
  this.fn = this.fn || fn;
  this.async = async;
}


Mapper.Iterator = Iterator;

function Iterator(factory) {
  this.factory = factory;
  this.fn = factory.fn;
}
Iterator.prototype.next = function next(chunk) {
  const res = this.fn(chunk.data, chunk.index);
  chunk.data = res;
  return chunk;
};
