const Benchmark = require('benchmark');
const suite = new Benchmark.Suite;
const benchmarks = require('beautify-benchmark');

function f() {
}
suite.add('new', function() {
  const a = new f();
})
suite.add('{}', () => {
  const a = {};
})
.add('2', () => {
  const a = 2;
})
.add('""', () => {
  const a = '';
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
