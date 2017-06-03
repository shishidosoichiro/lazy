'use strict';

module.exports = Mapper;

const inherits = require('util').inherits;
const Through = require('./through');

inherits(Mapper, Through);

function Mapper(fn, async) {
  Through.call(this);
  this.fn = this.fn || fn;
  this.async = async === true;
}


Mapper.Iterator = Iterator;
inherits(Iterator, Through.Iterator);

function Iterator(factory) {
  Through.Iterator.call(this);
  this.fn = factory.fn;
}
Iterator.prototype.next = function next(chunk) {
  const res = this.fn(chunk.data, chunk.index);
  chunk.data = res;
  return chunk;
};
