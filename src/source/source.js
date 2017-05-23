'use strict';

const inherits = require('util').inherits;
const Stream = require('../stream');
const Chunk = require('../chunk');

var Compose;

module.exports = Source;
inherits(Source, Stream);

function Source(){
  Stream.call(this);
}
Source.prototype.pipe = function pipe(feed) {
  if (!Compose) Compose = require('./compose');
  return new Compose(this, feed);
};
Source.prototype.iterator = function iterator() {
  return new this.constructor.Iterator(this);
};
