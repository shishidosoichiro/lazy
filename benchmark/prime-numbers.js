const Benchmark = require('benchmark');
const suite = new Benchmark.Suite;
const benchmarks = require('beautify-benchmark');

// lodash
const Lodash = require('lodash');
const Lazyjs = require('lazy.js');
const pull = require('pull-stream');

// lazy-trial2
const Range = require('../src/source/range');
const Take = require('../src/through/take');
const Filter = require('../src/through/filter');
const Mapper = require('../src/through/map');
const Each = require('../src/feed/each');

// initialize
const max = 10000;
const head = 100;
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
const result = [2];
const each = new Each((data) => result.push(data))
//const each = new Each((data) => console.log(data))
each.feed([
  new Range(3, max),
  new Filter(isPrimeNumber()),
  new Take(head)
])
console.log(result.join(', '));
console.log(result.length);

suite.add('lazy-trial2', () => {
  const result = [2];
  const each = new Each((data) => result.push(data))
  each.feed([
    new Range(3, max),
    new Filter(isPrimeNumber()),
    new Take(head)
  ])
})
suite.add('VanillaJS', function() {
  const result = [2];
  var i = -1;
  var j = head;
  while (++i < max) {
    if (!isPrimeNumber(i)) continue;
    if (--j < 0) break;
    result.push(i);
  }
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
