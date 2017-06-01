'use strict';

module.exports = Through;

const inherits = require('util').inherits;
const Stream = require('../stream');
const Compose = require('./compose');
//const Break = require('../through/break');
//const Filter = require('../through/filter');
//const Map = require('../through/map');
//const Take = require('../through/take');
//const Each = require('../feed/each');
//const Value = require('../feed/value');

inherits(Through, Stream);

function Through(){
  Stream.call(this);
}
Through.prototype.iterator = function iterator() {
  return new this.constructor.Iterator(this);
};
Through.prototype.pipe = function pipe(feed) {
  return new Compose([this, feed]);
};
Through.prototype.break = function breake(fn, async){
  return this.pipe(new Break(fn, async));
};
Through.prototype.filter = function filter(fn, async){
  return this.pipe(new Filter(fn, async));
};
Through.prototype.map = function map(fn, async){
  return this.pipe(new Mapper(fn, async));
};
Through.prototype.take = function take(num, async){
  return this.pipe(new Take(num, async));
};
Through.prototype.each = function each(fn){
  return new Each(fn).feed(this.streams);
};
Through.prototype.value = function value(async){
  return new Value(async).feed(this.streams);
};

Through.Iterator = Iterator;

function Iterator() {
}
Iterator.prototype.next = function next(chunk) {
  return chunk;
};
