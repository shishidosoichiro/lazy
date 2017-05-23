'use strict';

const inherits = require('util').inherits;
const Source = require('./source');
const Chunk = require('../chunk');

module.exports = Generate;
inherits(Generate, Source);

function Generate(fn, async) {
  Source.call(this);
  this.fn = this.fn;
  this.async = async;
}

Generate.Iterator = Iterator;

function Iterator(factory) {
  this.index = 0;
  this.ended = false;
  this.chunk = new Chunk();
  this.fn = this.fn || factory.fn;
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
Iterator.prototype.nextAsync = function nextAsync(chunk, callback) {
  this.callback = callback;
  this.fnAsync();
};
Iterator.prototype._onRead = function _onRead() {
  this.chunk.data = this.res;
  this.chunk.index = this.index++;
  this.chunk.next = false;
  this.chunk.end = false;
  var callback = this.callback(this.chunk);
};
Iterator.prototype.fnAsync = function fnAsync() {
  this.res = this.fn(this.index);
  //this._onRead()
  process.nextTick(this._onRead)
};
