'use strict';

module.exports = Each;

function Each(fn) {
  this.fn = fn;
  this.sources = [];
  this._onRead = this._onRead.bind(this);
}
Each.prototype.feed = function (sources) {
  this.sources = sources;
  var chunk;
  while (chunk = this.fetch()) {
    if (chunk.end) return;
    if (chunk.next) continue;
    this.fn(chunk.data, chunk.index);
  }
};
Each.prototype.fetch = function () {
  const sources = this.sources;
  const length = sources.length;
  var i = -1;
  while (++i < length) {
    var source = sources[i];
    var chunk = source.read(chunk);
    if (chunk.next) return chunk;
    if (chunk.end) return chunk;
  }
  return chunk;
};
Each.prototype.feedAsync = function (sources) {
  this.sources = sources;
  this.length = sources.length;
  this.index = -1;
  this.fetchAsync();
};
Each.prototype.fetchAsync = function (chunk) {
  const sources = this.sources;
  const length = this.length;
  while (++this.index < length) {
    var source = sources[this.index];
    if (source.async)
      return source.readAsync(chunk, this._onRead);

    chunk = source.read(chunk);
    if (chunk.end) return;
    if (chunk.next) {
      this.index = -1;
      return this.fetchAsync();
    }
  }
  this.fn(chunk.data, chunk.index);
  this.index = -1;
  this.fetchAsync();
};
Each.prototype._onRead = function (chunk) {
  if (chunk.end) return;
  if (chunk.next) {
    this.index = -1;
    return this.fetchAsync();
  }
  this.fetchAsync(chunk);
};
