'use strict';

const inherits = require('util').inherits;
const Stream = require('../stream');
const Compose = require('./compose');

module.exports = Through;
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

Through.Iterator = Iterator;

function Iterator() {
}
Iterator.prototype.next = function next(chunk) {
  return chunk;
};
