'use strict';

const inherits = require('util').inherits;
const Through = require('./through');

module.exports = Mapper;
inherits(Mapper, Through);

function Mapper(fn, async) {
  this.fn = this.fn || fn;
  this.async = async;
  Through.call(this);
}
Mapper.prototype.read = function read(chunk) {
  const res = this.fn(chunk.data, chunk.index);
  chunk.data = res;
  return chunk;
};
