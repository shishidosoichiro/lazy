'use strict';

module.exports = Each;

const inherits = require('util').inherits;
const Feed = require('./feed');

inherits(Each, Feed);

function Each(fn) {
  Feed.call(this);
  this.fn = fn;
}
Each.prototype.feed = function feed(sources) {
  this._iterators = this.iterators(sources);
  if (isAsync(this._iterators)) return this.feedAsync();
  return this.feedSync();
};
Each.prototype.feedSync = function feedSync() {
  while (true) {
    var chunk = this.fetch();
    if (chunk.end) break;
    if (chunk.next) continue;
    this.fn(chunk.data, chunk.index);
  }
};
Each.prototype.feedAsync = function feedAsync() {
  this.startFetchAsync();
};
Each.prototype.onFeedAsync = function onFeedAsync(chunk) {
  this.fn(chunk.data, chunk.index);
  this.startFetchAsync();
};

function isAsync(iterators) {
  const length = iterators.length;
  var i = -1;
  while (++i < length)
    if (iterators[i].async) return true;
  return false;
}
