'use strict';

const inherits = require('util').inherits;
const Through = require('./through');

module.exports = Compose;
inherits(Compose, Through);

function Compose(streams) {
  Through.call(this);
  this.streams = streams;
}
Compose.prototype.read = function read(chunk) {
  throw new TypeError('not implemented');
};
Compose.prototype.pipe = function pipe(feed) {
  return new Compose(this.streams.concat(feed));
};

Compose.Iterator = Iterator;
inherits(Iterator, Through.Iterator);

function Iterator(factory) {
  Through.Iterator.call(this);
  this.streams = this.streams || factory.streams;
  this._iterators = iterators(this.streams);
}
Iterator.prototype.next = function next(chunk, callback, thisArg) {
  if (isAsync(this._iterators)) return this.nextSync(chunk, callback, thisArg);
  return this.nextSync(chunk);
};
Iterator.prototype.nextSync = function nextSync(chunk) {
  const iterators = this._iterators;
  const length = iterators.length;
  var i = -1;
  while (++i < length) {
    var iterator = iterators[i];
    chunk = iterator.next(chunk);
    if (chunk.next) break;
    if (chunk.end) break;
  }
  return chunk;
};
Iterator.prototype.nextAsync = function nextAsync(chunk, callback, thisArg) {
  this.callback = callback;
  this.thisArg = thisArg;
  this.startFetchAsync(chunk)
};
Iterator.prototype.startFetchAsync = function startFetchAsync(chunk) {
  this.index = -1;
  this.fetchAsync(chunk);
};
Iterator.prototype.fetchAsync = function fetchAsync(chunk) {
  const iterators = this._iterators;
  const length = iterators.length;
  while (++this.index < length) {
    var iterator = iterators[this.index];
    if (iterator.async)
      return iterator.nextAsync(chunk, onNext, this);

    chunk = iterator.next(chunk);
    if (chunk.end) return this.callback.call(this.thisArg, chunk);
    if (chunk.next) return this.callback.call(this.thisArg, chunk);
  }
  this.callback.call(this.thisArg, chunk);
};

function onNext(chunk) {
  if (chunk.end) return this.callback.call(this.thisArg, chunk);
  if (chunk.next) return this.callback.call(this.thisArg, chunk);
  this.fetchAsync(chunk);
};

function iterators(streams) {
  const length = streams.length;
  const iterators = new Array(length);
  var i = -1;
  while (++i < length) {
    iterators[i] = streams[i].iterator();
  }
  return iterators;
};

function isAsync(iterators) {
  const length = iterators.length;
  var i = -1;
  while (++i < length)
    if (iterators[i].async) return true;
  return false;
}
