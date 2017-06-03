'use strict';

module.exports = Filter;

const inherits = require('util').inherits;
const Through = require('./through');

inherits(Filter, Through);

function Filter(fn, async) {
  Through.call(this);
  this.fn = fn;
  this.async = async === true;
}


Filter.Iterator = Iterator;
inherits(Iterator, Through.Iterator);

function Iterator(factory) {
  Through.Iterator.call(this);
  this.fn = this.fn || factory.fn;
  this.index = 0;
}
Iterator.prototype.next = function next(chunk) {
  const res = this.fn(chunk.data, chunk.index);
  if (res) chunk.index = this.index++;
  else     chunk.next  = true;
  return chunk;
};
