'use strict';

const inherits = require('util').inherits;
const Feed = require('./feed');

module.exports = Value;
inherits(Value, Feed);

function Value(fn) {
  this.fn = fn;
  this.res = [];
}
Value.prototype.feed = function feed(sources) {
  this.sources = sources;
  while (true) {
    var chunk = this.fetch()
    if (!chunk) break;
    if (chunk.end) break;
    if (chunk.next) continue;
    this.res[chunk.index] = chunk.data;
  }
  return this.res;
};
Value.prototype.feedAsync = function feedAsync(sources) {
  this.sources = sources;
  this.length = sources.length;
  this.startFetchAsync();
};
Value.prototype.onFeedAsync = function onFeedAsync(sources) {
  this.res[chunk.index] = chunk.data;
  this.startFetchAsync();
};
