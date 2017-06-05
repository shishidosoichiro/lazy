'use strict';

module.exports = Generate;

const inherits = require('util').inherits;
const Source = require('./source');
const Chunk = require('../chunk');

inherits(Generate, Source);

function Generate(fn, async) {
  Source.call(this);
  this.fn = this.fn;
  this.async = async == true;
}

Generate.Iterator = Iterator;

function Iterator(factory) {
  this.index = 0;
  this.ended = false;
  this.chunk = new Chunk();
  if (this.fn === void 0) this.fn = factory.fn;
  this.async = factory.async;
  if (factory.async) this._onRead = this._onRead.bind(this);
}
Iterator.prototype.next = function next() {
  const res = this.fn(this.index);
  //return new Chunk(res, this.index++);
  this.chunk.data = res;
  this.chunk.index = this.index++;
  this.chunk.next = false;
  this.chunk.end = this.ended;
  return this.chunk;
};
Iterator.prototype.nextAsync = function nextAsync(chunk, callback, thisArg) {
  this.callback = callback;
  this.thisArg = thisArg;
  this.fnAsync();
};
Iterator.prototype._onRead = function _onRead() {
  this.chunk.data = this.res;
  this.chunk.index = this.index++;
  this.chunk.next = false;
  this.chunk.end = false;
  this.callback.call(this.chunk, thisArg);
};
Iterator.prototype.fnAsync = function fnAsync() {
  this.res = this.fn(this.index);
  //this._onRead()
  process.nextTick(this._onRead)
};
