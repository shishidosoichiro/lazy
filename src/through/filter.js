'use strict';

const inherits = require('util').inherits;
const Through = require('./through');

module.exports = Filter;
inherits(Filter, Through);

function Filter(fn, async) {
  Through.call(this);
  this.fn = this.fn || fn;
  this.async = async;
}
Filter.prototype.read = function read(chunk) {
  const res = this.fn(chunk.data, chunk.index);
  if (res) chunk.index = this.index++;
  else     chunk.next = true;
  return chunk;
};
