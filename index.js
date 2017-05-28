'use strict';

module.exports = _;

function _(streams){
  this.streams = streams;
};

const Generate = require('./src/source/generate');
_.generate = function generate(fn, async){
  return new Generate(fn, async);
};
_.prototype.generate = function generate(fn, async){
  return new _(this.streams.concat(new Generate(fn, async)));
};

const Range = require('./src/source/range');
_.range = function range(start, end, step, async){
  return new Range(fn, async);
};
_.prototype.range = function range(start, end, step, async){
  return new _(this.streams.concat(new Range(fn, async)));
};

const Break = require('./src/through/break');
_.break = function break(fn, async){
  return new Break(fn, async);
};
_.prototype.break = function break(fn, async){
  return new _(this.streams.concat(new Break(fn, async)));
};

const Filter = require('./src/through/filter');
_.filter = function filter(fn, async){
  return new Filter(fn, async);
};
_.prototype.filter = function filter(fn, async){
  return new _(this.streams.concat(new Filter(fn, async)));
};

const Map = require('./src/through/map');
_.map = function map(fn, async){
  return new Map(fn, async);
};
_.prototype.map = function map(fn, async){
  return new _(this.streams.concat(new Map(fn, async)));
};

const Take = require('./src/through/take');
_.take = function take(num, async){
  return new Take(num, async);
};
_.prototype.take = function take(num, async){
  return new _(this.streams.concat(new Take(num, async)));
};

const Each = require('./src/feed/each');
_.each = function each(num, async){
  return new Each(num, async);
};
_.prototype.each = function each(num, async){
  return new _(this.streams.concat(new Each(num, async)));
};

const Value = require('./src/feed/value');
_.value = function value(num, async){
  return new Value(num, async);
};
_.prototype.value = function value(num, async){
  return new _(this.streams.concat(new Value(num, async)));
};
