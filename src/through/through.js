'use strict';

const inherits = require('util').inherits;
const Stream = require('../stream');
var Compose;

module.exports = Through;
inherits(Through, Stream);

function Through(){
  Stream.call(this);
}
Through.prototype.read = function read(chunk) {
  return chunk;
};
Through.prototype.pipe = function pipe(feed) {
  if (!Compose) Compose = require('./compose');
  return new Compose([this, feed]);
};
