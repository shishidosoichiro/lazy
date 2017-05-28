'use strict';

const inherits = require('util').inherits;
const Feed = require('./feed');
const Through = require('../through/through');
const Compose = require('../through/compose');

module.exports = Value;
inherits(Value, Feed);
Through.prototype.value = function value(fn, async){
  return new Compose([this, new Value(fn, async)]);
};

function Value(fn) {
  this.fn = fn;
  this.res = [];
}
Value.prototype.feed = function feed(sources) {
  this._iterators = this.iterators(sources);
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
