'use strict';

module.exports = Through;

const inherits = require('util').inherits;
const Stream = require('../stream');
const Compose = require('./compose');
const Each = require('../feed/each');
const Value = require('../feed/value');

inherits(Through, Stream);

function Through(async){
  Stream.call(this);
  this.async = async == true;
}
Through.prototype.iterator = function iterator() {
  return new this.constructor.Iterator(this);
};
Through.prototype.pipe = function pipe(feed) {
  return feed.feed([this]);
};
Through.prototype.feed = function feed(sources) {
  return new Compose(sources.concat(this));
};
Through.prototype.break = function breake(fn, async){
  const Break = require('../through/break');
  return this.pipe(new Break(fn, async));
};
Through.prototype.filter = function filter(fn, async){
  const Filter = require('../through/filter');
  return this.pipe(new Filter(fn, async));
};
Through.prototype.map = function map(fn, async){
  const Map = require('../through/map');
  return this.pipe(new Map(fn, async));
};
Through.prototype.take = function take(num, async){
  const Take = require('../through/take');
  return this.pipe(new Take(num, async));
};
Through.prototype.each = function each(fn){
  return this.pipe(new Each(fn));
};
Through.prototype.value = function value(async){
  return this.pipe(new Value(async));
};

Through.Iterator = Iterator;

function Iterator(factory) {
  this.async = factory.async;
}
Iterator.prototype.next = function next(chunk) {
  return chunk;
};
