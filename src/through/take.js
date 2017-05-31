'use strict';

module.exports = Take;

const inherits = require('util').inherits;
const Break = require('./break');
const Through = require('./through');

inherits(Take, Break);

function Take(max) {
  Break.call(this);
  this.max = max = max || 10;
}

Take.Iterator = Iterator;
inherits(Iterator, Break.Iterator);

function Iterator(factory) {
  Break.Iterator.call(this, factory);
  this.max = factory.max;
}
Iterator.prototype.fn = function take(data, index) {
  return index < this.max;
};
