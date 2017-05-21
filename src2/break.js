'use strict';

module.exports = Break;

function Break(fn, async) {
  this.fn = fn;
  this.async = async;
  this.index = 0;
  this.end = false;
}
Break.prototype.read = function read(chunk) {
  if (this.end) {
    chunk.end = true;
    return chunk;
  }
  this.end = !this.fn(chunk.data, chunk.index);
  if (this.end) chunk.end = true;
  else          chunk.index = this.index++;
  return chunk;
};
Break.prototype.feed = function feed(source) {
  return
  return new Compose(source, this);
};
Break.prototype.pipe = function pipe(feed) {
  return feed.feed(this);
};
