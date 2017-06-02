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
  this.async = false;
}
Through.prototype.iterator = function Through_iterator() {
  return new this.constructor.Iterator(this);
};
Through.prototype.pipe = function Through_pipe(feed) {
  return new Compose([this, feed]);
};
Through.prototype.break = function Through_breake(fn, async){
  return this.pipe(new Break(fn, async));
};
Through.prototype.filter = function Through_filter(fn, async){
  return this.pipe(new Filter(fn, async));
};
Through.prototype.map = function Through_map(fn, async){
  return this.pipe(new Mapper(fn, async));
};
Through.prototype.take = function Through_take(num, async){
  return this.pipe(new Take(num, async));
};
Through.prototype.each = function Through_each(fn){
  new Each(fn).feed(this.streams);
};
Through.prototype.value = function Through_value(async){
  return new Value(async).feed(this.streams);
};

Through.Iterator = Iterator;

function Iterator() {
}
Iterator.prototype.next = function Iterator_next(chunk) {
  return chunk;
};
