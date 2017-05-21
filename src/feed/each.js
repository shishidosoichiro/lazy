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
  this.sources = sources;
  while (true) {
    var chunk = this.fetch();
    if (chunk.end) break;
    if (chunk.next) continue;
    this.fn(chunk.data, chunk.index);
  }
};
Each.prototype.feedAsync = function feedAsync(sources) {
  this.sources = sources;
  this.length = sources.length;
  this.startFetchAsync();
};
Each.prototype.onFeedAsync = function onFeedAsync(chunk) {
  this.fn(chunk.data, chunk.index);
  this.startFetchAsync();
};
