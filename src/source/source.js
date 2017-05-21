'use strict';

const inherits = require('util').inherits;
const Stream = require('../stream');
const Chunk = require('../chunk');

var Compose;

module.exports = Source;
inherits(Source, Stream);

function Source(){
  Stream.call(this);
  this.index = 0;
  this.ended = false;
  this.chunk = new Chunk();
}
Source.prototype.read = function read() {
  throw new TypeError('not implemented');
};
Source.prototype.pipe = function pipe(feed) {
  if (!Compose) Compose = require('./compose');
  return new Compose(this, feed);
};
