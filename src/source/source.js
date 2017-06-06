'use strict';

module.exports = Source;

const inherits = require('util').inherits;
const Stream = require('../stream');
const Chunk = require('../chunk');
const Compose = require('../through/compose');
const Break = require('../through/break');
const Filter = require('../through/filter');
const Map = require('../through/map');
const Take = require('../through/take');
const Each = require('../feed/each');
const Value = require('../feed/value');

module.exports = Source;

inherits(Source, Stream);

function Source(){
  Stream.call(this);
  this.async = false;
}
Source.prototype.iterator = function iterator() {
  return new this.constructor.Iterator(this);
};
Source.prototype.pipe = function pipe(feed) {
  return feed.feed([this]);
};
Source.prototype.break = function breake(fn, async){
  return this.pipe(new Break(fn, async));
};
Source.prototype.filter = function filter(fn, async){
  return this.pipe(new Filter(fn, async));
};
Source.prototype.map = function map(fn, async){
  return this.pipe(new Map(fn, async));
};
Source.prototype.take = function take(max){
  return this.pipe(new Take(max));
};
Source.prototype.each = function each(fn){
  return this.pipe(new Each(fn));
};
Source.prototype.value = function value(async){
  return this.pipe(new Value(async));
};
