'use strict';

module.exports = _;

const Generate = require('./src/source/generate');
const Range = require('./src/source/range');
const Break = require('./src/through/break');
const Filter = require('./src/through/filter');
const Map = require('./src/through/map');
const Take = require('./src/through/take');
const Each = require('./src/feed/each');
const Value = require('./src/feed/value');

function _(streams) {
  this.streams = streams;
}

_.generate = function generate(fn, async) {
  return new _([new Generate(fn, async)])
};
_.range = function range(start, end, step, async) {
  return new _([new Range(start, end, step, async)])
};
_.break = function breake(fn, async) {
  return new _([new Break(fn, async)])
};
_.filter = function filter(fn, async) {
  return new _([new Filter(fn, async)]);
};
_.map = function map(fn, async) {
  return new _([new Map(fn, async)]);
};
_.take = function take(max) {
  return new _([new Take(max)]);
};
_.each = function each(fn) {
  return new _([new Each(fn)]);
};
_.value = function value(async) {
  return new _([new Value(async)]);
};

_.prototype.pipe = function prototype_pipe(feed) {
  return feed.feed(this.streams);
};
_.prototype.feed = function prototype_feed(streams) {
  return new _(streams.concat(this.streams));
};
_.prototype.break = function prototype_break(fn, async) {
  return this.pipe(new Break(fn, async));
};
_.prototype.filter = function prototype_filter(fn, async) {
  return this.pipe(new Filter(fn, async));
};
_.prototype.map = function prototype_map(fn, async) {
  return this.pipe(new Map(fn, async));
};
_.prototype.take = function prototype_take(max) {
  return this.pipe(new Take(max));
};
_.prototype.each = function prototype_each(fn) {
  return this.pipe(new Each(fn));
};
_.prototype.value = function prototype_value(async) {
  return this.pipe(new Value(async));
};
