'use strict';

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
}
Source.prototype.iterator = function iterator() {
  return new this.constructor.Iterator(this);
};
Source.prototype.pipe = function pipe(feed) {
  return new Compose(this, feed);
};
Source.prototype.break = function breake(fn, async){
  return new Compose([this, new Break(fn, async)]);
};
Source.prototype.filter = function filter(fn, async){
  return new Compose([this, new Filter(fn, async)]);
};
Source.prototype.map = function map(fn, async){
  return new Compose([this, new Map(fn, async)]);
};
Source.prototype.take = function take(num, async){
  return new Compose([this, new Take(num, async)]);
};
Source.prototype.each = function each(num, async){
  return new Compose([this, new Each(num, async)]);
};
Source.prototype.value = function value(num, async){
  return new Compose([this, new Value(num, async)]);
};
