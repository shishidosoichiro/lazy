const Benchmark = require('benchmark');
const suite = new Benchmark.Suite;
const benchmarks = require('beautify-benchmark');

// lodash
const Lodash = require('lodash');
const Lazyjs = require('lazy.js');
const pull = require('pull-stream');

// lazy-trial2
const RangeOld = require('../src3/source/range');
const TakeOld = require('../src3/through/take');
const FilterOld = require('../src3/through/filter');
const EachOld = require('../src3/feed/each');

// lazy-trial2
const Range = require('../src/source/range');
const Take = require('../src/through/take');
const Filter = require('../src/through/filter');
const Each = require('../src/feed/each');

// initialize
const max = 27000;
const head = 100;
function isSquareNumber(num){
  return Math.sqrt(num) === Math.floor(Math.sqrt(num));
}
function isPrimeNumber(){
  var primes = [2];
  return (num) => {
    const divisible = primes.some((prime) => {
      return num % prime === 0
    })
    if (divisible) return false;
    primes[primes.length] = num;
    return true;
  }
}

// test
const result = [];
const each = new Each((data) => result.push(data))
each.feed([
  new Range(0, max),
  new Filter(isSquareNumber),
  new Take(head)
])
console.log(result.join(', '));
console.log(result.length);
//const each = new Each((data) => result.push(data))
//each.onEnd(() => {
//  console.log(result.join(', '));
//  console.log(result.length);
//})
//each.feedAsync([
//  new Range(0, max, 1, true),
//  new Filter(isSquareNumber),
//  new Take(head)
//])
//return;

//suite.add('VanillaJS', function() {
//  const result = [];
//  var i = -1;
//  var j = head;
//  while (++i < max) {
//    if (!isSquareNumber(i)) continue;
//    if (--j < 0) break;
//    result.push(i);
//  }
//})
//suite.add('Lazyjs', () => {
//  const result = [];
//  Lazyjs.range(max)
//  .filter(isSquareNumber)
//  .take(head)
//  .forEach((data) => result.push(data))
//})
suite.add('Lodash', () => {
  const result = [];
  Lodash(Lodash.range(0, max))
  .filter(isSquareNumber)
  .take(head)
  .forEach((data) => result.push(data))
})
suite.add('lazy-trial3-old', () => {
  const result = [];
  const each = new EachOld((data) => result.push(data))
  each.feed([
    new RangeOld(0, max),
    new FilterOld(isSquareNumber),
    new TakeOld(head)
  ])
})
suite.add('lazy-trial3', () => {
  const result = [];
  const each = new Each((data) => result.push(data))
  each.feed([
    new Range(0, max),
    new Filter(isSquareNumber),
    new Take(head)
  ])
})
//suite.add('lazy-trial3-async', (deferred) => {
//  const result = [];
//  const each = new Each((data) => result.push(data))
//  each.onEnd(deferred.resolve.bind(deferred));
//  each.feedAsync([
//    new Range(0, max, 1, true),
//    new Filter(isSquareNumber),
//    new Take(head)
//  ])
//}, {defer: true})
//suite.add('pull-stream', () => {
//  const result = [];
//  pull(
//    pull.count(max),
//    pull.filter(isSquareNumber),
//    pull.take(head),
//    pull.drain((data) => result.push(data))
//  )
//})
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
