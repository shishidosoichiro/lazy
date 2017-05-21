'use strict';

const Chunk = require('./chunk');

module.exports = Generate;

function Generate(fn, async) {
  this.fn = fn;
  this.async = async;
  this.index = 0;
  this.chunk = new Chunk();
  if (async) this._onRead = this._onRead.bind(this);
}
Generate.prototype.read = function read() {
  const res = this.fn(this.index);
  //if (typeof res !== 'undefined' && res.end === true) return res;
  //return new Chunk(res, this.index++);
  this.chunk.data = res;
  this.chunk.index = this.index++;
  this.chunk.next = undefined;
  this.chunk.end = undefined;
  return this.chunk;
};
Generate.prototype.readAsync = function readAsync(chunk, callback) {
  this.callback = callback;
  this.fnAsync(this.index, this._onRead);
};
Generate.prototype._onRead = function _onRead(res) {
  this.chunk.data = res;
  this.chunk.index = this.index++;
  this.chunk.next = undefined;
  this.chunk.end = undefined;
  this.callback(this.chunk)
};
Generate.prototype.fnAsync = function fnAsync(index, _onRead) {
  const res = this.fn(index);
  process.nextTick(() => {
    _onRead(res);
  })
};
Generate.prototype.pipe = function pipe(feed) {
  return feed.feed(this);
};
