const Benchmark = require('benchmark');
const suite = new Benchmark.Suite;
const benchmarks = require('beautify-benchmark');

const Chunk = require('../src/chunk');
const chunk = new Chunk();

const obj = {
  undefinedValue: undefined,
  nullValue: null,
  falseValue: false,
  emptyStringValue: '',
  zeroValue: 0,
  trueValue: true
}

suite.add('chunk', function() {
  if (chunk) {return chunk;}
})
suite.add('chunk.end', function() {
  if (chunk.end) {return chunk.end;}
})
suite.add('chunk.end', function() {
  if (chunk && chunk.end) {return chunk;}
})
suite.add('undefined', function() {
  if (!obj.undefinedValue) {return obj.undefinedValue;}
})
suite.add('typeof undefined', function() {
  if (typeof obj.undefinedValue === 'undefined') {return obj.undefinedValue;}
})
suite.add('null', () => {
  if (!obj.nullValue) {return obj.nullValue;}
})
suite.add('=== null', () => {
  if (obj.nullValue === null) {return obj.nullValue;}
})
suite.add('false', () => {
  if (!obj.falseValue) {return obj.falseValue;}
})
suite.add('=== false', () => {
  if (obj.falseValue === false) {return obj.falseValue;}
})
suite.add('0', () => {
  if (!obj.emptyStringValue) {return obj.emptyStringValue;}
})
suite.add('""', () => {
  if (!obj.zeroValue) {return obj.zeroValue;}
})
suite.add('true', () => {
  if (obj.trueValue) {return obj.trueValue;}
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
