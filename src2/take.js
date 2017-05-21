'use strict';

const inherits = require('util').inherits;
const Break = require('./break');

module.exports = Take;
inherits(Take, Break);

function Take(max, async) {
  Break.call(this, take, async);
  this.max = max = max || 10;
}
function take(data, index){
  return index < this.max;
}
