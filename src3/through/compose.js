'use strict';

const inherits = require('util').inherits;
const Through = require('./through');

module.exports = Compose;
inherits(Compose, Through);

function Compose(streams) {
  Through.call(this);
  this.streams = streams;
}
Compose.prototype.read = function read(chunk) {
  throw new TypeError('not implemented');
};
Compose.prototype.pipe = function pipe(feed) {
  return new Compose(this.streams.concat(feed));
};
