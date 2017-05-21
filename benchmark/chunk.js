const Benchmark = require('benchmark');
const suite = new Benchmark.Suite;
const benchmarks = require('beautify-benchmark');

const Chunk = require('../src/chunk');

function f() {
}
suite.add('new', function() {
  const a = new f();
})
suite.add('{}', () => {
  const a = {};
})
suite.add('chunk', () => {
  const a = new Chunk();
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
