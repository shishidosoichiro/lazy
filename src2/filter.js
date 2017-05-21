'use strict';

module.exports = Filter;

function Filter(fn, async) {
  this.fn = fn;
  this.async = async;
  this.index = 0;
  //this.done = this.done.bind(this);
}
Filter.prototype.read = function (chunk) {
  const res = this.fn(chunk.data, chunk.index);
  if (!res) chunk.next = true;
  else      chunk.index = this.index++;
  return chunk;
};
