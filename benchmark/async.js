const Benchmark = require('benchmark');
const suite = new Benchmark.Suite;
const benchmarks = require('beautify-benchmark');

// lodash
const Lodash = require('lodash');
const Lazyjs = require('lazy.js');
const pull = require('pull-stream');

// lazy-trial2
const Range = require('../src/range');
const Take = require('../src/take');
const Filter = require('../src/filter');
const Each = require('../src/each');

// initialize
const max = 100000;
const head = 100;
function isSquareNumber(num){
  return Math.sqrt(num) === Math.floor(Math.sqrt(num));
}

// test
const result = [];
const each = new Each((data) => console.log(data))
each.feedAsync([
  new Range(0, 1, true),
  new Take(max),
  new Filter(isSquareNumber),
  new Take(head)
])
console.log(result.join(', '));
console.log(result.length);
return;

suite.add('lazy-trial2', () => {
  const result = [];
  const each = new Each((data) => result.push(data))
  each.feed([
    new Range(),
    new Take(max),
    new Filter(isSquareNumber),
    new Take(head)
  ])
})
suite.add('VanillaJS', function() {
  const result = [];
  var i = -1;
  var j = head;
  while (++i < max) {
    if (!isSquareNumber(i)) continue;
    if (--j < 0) break;
    result.push(i);
  }
})
suite.add('Lodash', () => {
  const result = [];
  Lodash(Lodash.range(0, max))
  .filter(isSquareNumber)
  .take(head)
  .forEach((data) => result.push(data))
})
suite.add('Lazyjs', () => {
  const result = [];
  Lazyjs.range(max)
  .filter(isSquareNumber)
  .take(head)
  .forEach((data) => result.push(data))
})
suite.add('pull-stream', () => {
  const result = [];
  pull(
    pull.count(max),
    pull.filter(isSquareNumber),
    pull.take(head),
    pull.drain((data) => result.push(data))
  )
})
.on('cycle', (e) => {
  benchmarks.add(e.target)
})
.on('eror', (e) => {
  console.log(e)
})
.on('complete', () => {
  benchmarks.log()
})
// run async
.run({ 'async': true });
