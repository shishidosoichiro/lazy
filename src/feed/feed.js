'use strict';

module.exports = Feed;

const inherits = require('util').inherits;
const Stream = require('../stream');

inherits(Feed, Stream);

function Feed(){
  Stream.call(this);
  this.sources = [];
  this._iterators = [];
  this._onRead = this._onRead.bind(this);
}
Feed.prototype.iterators = function iterators(sources) {
  const length = sources.length;
  const iterators = new Array(length);
  var i = -1;
  while (++i < length) {
    iterators[i] = sources[i].iterator();
  }
  return iterators;
};
Feed.prototype.fetch = function fetch(iterators) {
  const length = iterators.length;
  var i = -1;
  while (++i < length) {
    var iterator = iterators[i];
    var chunk = iterator.next(chunk);
    if (chunk.next) break;
    if (chunk.end) break;
  }
  return chunk;
};
Feed.prototype.startFetchAsync = function startFetchAsync(chunk) {
  this.index = -1;
  this.fetchAsync();
};
Feed.prototype.fetchAsync = function fetchAsync(chunk) {
  const iterators = this._iterators;
  const length = iterators.length;
  while (++this.index < length) {
    var iterator = iterators[this.index];
    if (iterator.async)
      return iterator.nextAsync(chunk, this._onRead);

    chunk = iterator.next(chunk);
    if (chunk.end) return this._onEnd();
    if (chunk.next) return this.startFetchAsync();
  }
  this.onFeedAsync(chunk);
};
Feed.prototype._onRead = function _onRead(chunk) {
  if (chunk.end) return this._onEnd();
  if (chunk.next) return this.startFetchAsync();
  this.fetchAsync(chunk);
};
Feed.prototype.end = function end() {
  throw new TypeError('not implemented');
};
Feed.prototype.onEnd = function onEnd(onEnd) {
  this._onEnd = onEnd;
};
