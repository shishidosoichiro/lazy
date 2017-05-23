'use strict';

const inherits = require('util').inherits;
const Break = require('./break');

module.exports = Take;
inherits(Take, Break);

function Take(max) {
  Break.call(this);
  this.max = max = max || 10;
}
Take.prototype.fn = function take(data, index) {
  return index < this.max;
};
