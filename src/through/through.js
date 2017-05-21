'use strict';

const inherits = require('util').inherits;
const Stream = require('../stream');
var Compose;

module.exports = Through;
inherits(Through, Stream);

function Through(){
  Stream.call(this);
  this.index = 0;
}
Through.prototype.read = function read(chunk) {
  chunk.index = this.index++;
  return chunk;
};
Through.prototype.pipe = function pipe(feed) {
  if (!Compose) Compose = require('./compose');
  return new Compose([this, feed]);
};
