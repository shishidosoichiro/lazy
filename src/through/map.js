'use strict';

const inherits = require('util').inherits;
const Through = require('./through');
const Compose = require('./compose');

module.exports = Mapper;
inherits(Mapper, Through);
Through.prototype.map = function map(fn, async){
  return new Compose([this, new Mapper(fn, async)]);
};

function Mapper(fn, async) {
  Through.call(this);
  this.fn = this.fn || fn;
  this.async = async;
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
