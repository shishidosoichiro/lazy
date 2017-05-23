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
  if (async) this._onRead = this._onRead.bind(this);
}
Generate.prototype.readAsync = function readAsync(chunk, callback) {
  this.callback = callback;
  this.fnAsync(this.index, this._onRead);
};
Generate.prototype._onRead = function _onRead() {
  this.chunk.data = this.res;
  this.chunk.index = this.index++;
  this.chunk.next = false;
  this.chunk.end = false;
  var callback = this.callback(this.chunk);
};
Generate.prototype.fnAsync = function fnAsync(index, _onRead) {
  this.res = this.fn(index);
  process.nextTick(_onRead)
};


Generate.Iterator = Iterator;

function Iterator(factory) {
  this.factory = factory;
  this.index = 0;
  this.ended = false;
  this.chunk = new Chunk();
  this.fn = this.fn || factory.fn;
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
