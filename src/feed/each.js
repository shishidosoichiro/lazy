'use strict';

module.exports = Each;

const inherits = require('util').inherits;
const isAsync = require('../util').isAsync;
const Feed = require('./feed');

inherits(Each, Feed);

function Each(fn) {
  Feed.call(this);
  this.fn = fn;
}
Each.prototype.feed = function feed(sources) {
  this._iterators = this.iterators(sources);
  if (isAsync(this._iterators)) return this.feedAsync();
  return this.feedSync(this._iterators);
};
Each.prototype.feedSync = function feedSync(iterators) {
  while (true) {
    var chunk = this.fetch(iterators);
    if (chunk.end) break;
    if (chunk.next) continue;
    this.fn(chunk.data, chunk.index);
  }
};
Each.prototype.fetch = function fetch(iterators) {
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
Each.prototype.feedAsync = function feedAsync() {
  this.startFetchAsync();
};
Each.prototype.onFeedAsync = function onFeedAsync(chunk) {
  this.fn(chunk.data, chunk.index);
  this.startFetchAsync();
};
