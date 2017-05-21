'use strict';

const inherits = require('util').inherits;
const Stream = require('../stream');

module.exports = Feed;
inherits(Feed, Stream);

function Feed(){
  Stream.call(this);
  this.sources = [];
  this._onRead = this._onRead.bind(this);
}
Feed.prototype.fetch = function fetch() {
  const sources = this.sources;
  const length = sources.length;
  var i = -1;
  while (++i < length) {
    var source = sources[i];
    var chunk = source.read(chunk);
    if (chunk.next) break;
    if (chunk.end) break;
  }
  return chunk;
};
Feed.prototype.startFetchAsync = function fetchAsync(chunk) {
  this.index = -1;
  this.fetchAsync();
};
Feed.prototype.fetchAsync = function fetchAsync(chunk) {
  const sources = this.sources;
  const length = sources.length;
  while (++this.index < length) {
    var source = sources[this.index];
    if (source.async)
      return source.readAsync(chunk, this._onRead);

    chunk = source.read(chunk);
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
