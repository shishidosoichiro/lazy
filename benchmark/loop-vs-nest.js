const Benchmark = require('benchmark');
const suite = new Benchmark.Suite;
const benchmarks = require('beautify-benchmark');

suite.add('loop', (() => {
  function a(data){return data;}
  function b(data){return data;}
  function c(data){return data;}
  function d(data){return data;}
  function e(data){return data;}
  return () => {
    var data = 'data';
    const array = [a, b, c, d, e];
    const length = array.length;
    var i = -1;
    while (++i < length) {
      data = array[i](data);
    }
  }
})())
suite.add('nest', (() => {
  function a(data){return b(data);}
  function b(data){return c(data);}
  function c(data){return d(data);}
  function d(data){return e(data);}
  function e(data){return data;}
  return () => {
    var data = 'data';
    data = a(data);
  }
})())
suite.add('nest-callback', (() => {
  function ObjA(objB){
    this.objB = objB;
  }
  ObjA.prototype.execute = function ObjA_execute(data, callback, thisArg){
    this.callback = callback;
    this.thisArg = thisArg;
    this.objB.execute(data, this.afterExecute, this);
  }
  ObjA.prototype.afterExecute = function ObjA_afterExecute(data){
    this.callback.call(this.thisArg, data);
  }
  function ObjB(objC){
    this.objC = objC;
  }
  ObjB.prototype.execute = function ObjB_execute(data, callback, thisArg){
    this.callback = callback;
    this.thisArg = thisArg;
    this.objC.execute(data, this.afterExecute, this);
  }
  ObjB.prototype.afterExecute = function ObjB_afterExecute(data){
    this.callback.call(this.thisArg, data);
  }
  function ObjC(objD){
    this.objD = objD;
  }
  ObjC.prototype.execute = function ObjC_execute(data, callback, thisArg){
    this.callback = callback;
    this.thisArg = thisArg;
    this.objD.execute(data, this.afterExecute, this);
  }
  ObjC.prototype.afterExecute = function ObjC_afterExecute(data){
    this.callback.call(this.thisArg, data);
  }
  function ObjD(objE){
    this.objE = objE;
  }
  ObjD.prototype.execute = function ObjD_execute(data, callback, thisArg){
    this.callback = callback;
    this.thisArg = thisArg;
    this.objE.execute(data, this.afterExecute, this);
  }
  ObjD.prototype.afterExecute = function ObjD_afterExecute(data){
    this.callback.call(this.thisArg, data);
  }
  function ObjE(){
  }
  ObjE.prototype.execute = function ObjE_execute(data, callback, thisArg){
    this.callback = callback;
    this.thisArg = thisArg;
    this.afterExecute(data)
  }
  ObjE.prototype.afterExecute = function ObjE_afterExecute(data){
    this.callback.call(this.thisArg, data);
  }

  const objE = new ObjE();
  const objD = new ObjD(objE);
  const objC = new ObjC(objD);
  const objB = new ObjB(objC);
  const objA = new ObjA(objB);
  function afterExecute(data) {
    return data;
  }
  return () => {
    var data = 'data';
    objA.execute(data, afterExecute);
  }
})())
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
