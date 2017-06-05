const Benchmark = require('benchmark');
const benchmarks = require('beautify-benchmark');

// lodash
const Lodash = require('lodash');
const LazyJS = require('lazy.js');
const pull = require('pull-stream');

// lazy
const RangeOld = require('../src3/source/range');
const TakeOld = require('../src3/through/take');
const FilterOld = require('../src3/through/filter');
const EachOld = require('../src3/feed/each');

// lazy
const Range = require('../src/source/range');
const Take = require('../src/through/take');
const Filter = require('../src/through/filter');
const Each = require('../src/feed/each');

// settings
const max = 20000;
const head = 100;
const options = {
  VanillaJS: false,
  LazyJS: false,
  Lodash: true,
  LazyOld: false,
  Lazy: true,
  LazyChain: true,
  LazyPiping: true,
  Lazy3: false,
  LazyAsync: false,
  PullStream: false
}

// test
testLazyPiping(result => {
  console.log(result.join(', '));
  console.log(result.length);
})
testLazyPiping(result => {
  console.log(result.join(', '));
  console.log(result.length);
})
//return

const suite = new Benchmark.Suite;
if (options.VanillaJS)  suite.add('VanillaJS', testVanillaJS);
if (options.LazyJS)     suite.add('LazyJS', testLazyJS);
if (options.Lodash)     suite.add('Lodash', testLodash);
if (options.LazyOld)    suite.add('LazyOld', testLazyOld);
if (options.Lazy)       suite.add('Lazy', testLazy);
if (options.LazyChain)  suite.add('LazyChain', testLazyChain);
if (options.LazyPiping) suite.add('LazyPiping', testLazyPiping);
if (options.Lazy3)      suite.add('Lazy3', testLazy3);
if (options.LazyAsync)  suite.add('LazyAsync', testLazyAsync);
if (options.PullStream) suite.add('PullStream', testPullStream);
suite.on('cycle', (e) => {
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

/**
Tests

*/
function testVanillaJS(callback) {
  const result = [];
  var i = -1;
  var j = head;
  while (++i < max) {
    if (!isSquareNumber(i)) continue;
    if (--j < 0) break;
    result.push(i);
  }
  callback && callback(result)
}
function testLazyJS(callback) {
  const result = [];
  LazyJS.range(max)
  .filter(isSquareNumber)
  .take(head)
  .forEach(push(result))
  callback && callback(result)
}
function testLodash(callback) {
  const result = [];
  Lodash(Lodash.range(0, max))
  .filter(isSquareNumber)
  .take(head)
  .forEach(push(result))
  callback && callback(result)
}
function testLazyOld(callback) {
  const result = [];
  const each = new EachOld(push(result))
  each.feed([
    new RangeOld(0, max),
    new FilterOld(isSquareNumber),
    new TakeOld(head)
  ])
  callback && callback(result)
}
function testLazy(callback) {
  const result = [];
  const each = new Each(push(result))
  each.feed([
    new Range(0, max),
    new Filter(isSquareNumber),
    new Take(head)
  ])
  callback && callback(result)
}
function testLazyChain(callback) {
  const result = [];
  new Range(0, max)
  .filter(isSquareNumber)
  .take(head)
  .each(push(result))
  callback && callback(result)
}
function testLazyPiping(callback) {
  const result = [];
  new Range(0, max)
  .pipe(new Filter(isSquareNumber))
  .pipe(new Take(head))
  .pipe(new Each(push(result)))
  callback && callback(result)
}
function testLazy3(callback) {
  const result = [];
  const compose = new Range(0, max)
  .filter(isSquareNumber)
  .take(head)
  const each = new Each(push(result))
  each.feed(compose.streams);
  callback && callback(result)
}
function testLazyAsync(callbackdata) {
  const result = [];
  const each = new Each(push(result))
  each.onEnd(deferred.resolve.bind(deferred));
  each.feedAsync([
    new Range(0, max, 1, true),
    new Filter(isSquareNumber),
    new Take(head)
  ])
  callback && callback(result)
}
function testPullStream(callback) {
  const result = [];
  pull(
    pull.count(max),
    pull.filter(isSquareNumber),
    pull.take(head),
    pull.drain(push(result))
  )
  callback && callback(result)
}

/**
test Utilities

*/
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
function push(array) {
  return function(data, i){
    array.push(data);
  }
}
