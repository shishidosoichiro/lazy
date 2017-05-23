'use strict';

const inherits = require('util').inherits;
const Feed = require('./feed');

module.exports = Each;
inherits(Each, Feed);

function Each(fn) {
  Feed.call(this);
  this.fn = fn;
}
Each.prototype.feed = function feed(sources) {
  this._iterators = this.iterators(sources);
  while (true) {
    var chunk = this.fetch();
    if (chunk.end) break;
    if (chunk.next) continue;
    this.fn(chunk.data, chunk.index);
  }
};
Each.prototype.feedAsync = function feedAsync(sources) {
  this._iterators = this.iterators(sources);
  this.startFetchAsync();
};
Each.prototype.onFeedAsync = function onFeedAsync(chunk) {
  this.fn(chunk.data, chunk.index);
  this.startFetchAsync();
};
