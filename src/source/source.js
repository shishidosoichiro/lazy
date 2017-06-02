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
Source.prototype.iterator = function Source_iterator() {
  return new this.constructor.Iterator(this);
};
Source.prototype.pipe = function Source_pipe(feed) {
  return new Compose([this, feed]);
};
Source.prototype.break = function Source_breake(fn, async){
  return this.pipe(new Break(fn, async));
};
Source.prototype.filter = function Source_filter(fn, async){
  return this.pipe(new Filter(fn, async));
};
Source.prototype.map = function Source_map(fn, async){
  return this.pipe(new Map(fn, async));
};
Source.prototype.take = function Source_take(max){
  return this.pipe(new Take(max));
};
Source.prototype.each = function Source_each(fn){
  new Each(fn).feed(this);
};
Source.prototype.value = function Source_value(async){
  new Value(async).feed(this);
};
