'use strict';

module.exports = Filter;

const inherits = require('util').inherits;
const Through = require('./through');

inherits(Filter, Through);

function Filter(fn, async) {
  Through.call(this, false);
  this.fn = fn;
}


Filter.Iterator = Iterator;
inherits(Iterator, Through.Iterator);

function Iterator(factory) {
  Through.Iterator.call(this, factory);
  if (this.fn === void 0) this.fn = factory.fn;
  this.index = 0;
}
Iterator.prototype.next = function next(chunk) {
  const res = this.fn(chunk.data, chunk.index);
  if (res) chunk.index = this.index++;
  else     chunk.next  = true;
  return chunk;
};
