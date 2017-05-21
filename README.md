# lazy
this is experimental codes. faster than lazy.js.

## ループ処理

```js
// 平方数を100個見つける
const max = 10000;
const head = 100;
var i = max;
var j = head;
while (--i) {
  var data = max - i - 1;
  if (!isSquareNumber(data)) continue;
  if (--j) break;
  console.log(data);
}
```

## 少し一般化

```js
// 平方数を100個見つける
const max = 10000;
const head = 100;
var i = 10000;
var j = 100;
while (--i) {
  var chunk = generate(count)();
  if (chunk.next) continue;
  if (chunk.break) break;

  chunk = filter(isSquareNumber)(chunk);
  if (chunk.next) continue;
  if (chunk.break) break;

  chunk = take(chunk);
  if (chunk.next) continue;
  if (chunk.break) break;

  console.log(chunk.data);
}
```

## チェーン化

```js
// 平方数を100個見つける
const head = 100;
_.count()
.filter(isSquareNumber)
.take(head)
.log()
```

## パイプ化

```js
// 平方数を100個見つける
const head = 100;
_.count()
.pipe(_.filter(isSquareNumber))
.pipe(_.take(head))
.pipe(_.log())
```

## パイプ化

```js
// 平方数を100個見つける
const head = 100;
_.count()
.pipe(_.filter(isSquareNumber))
.pipe(_.take(head))
.pipe(_.log())
```

### Chunk

```js
function Chunk(data, next, end){
  if (data instanceof Chunk) return data;
  if (!(this instanceof Chunk)) return new Chunk(data, next, end);
  this.data = data;
  this.next = next;
  this.end = end;
}
Chunk.next = function next(data){
  return new Chunk(data, true);
}
Chunk.end = function end(data){
  return new Chunk(data, undefined, true);
}
```

### Source

```js
function Source(_read, async){
  if (typeof _read != 'function') throw new TypeError('invalid arguments');
  this.async = async || _read.length === 1;
  this._read = _read;
  this.push = this.push.bind(this);
}
Source.prototype.read = function () {
  const res = this._read();
  return Chunk(res);
};
Source.prototype.readAsync = function (onRead) {
  if (onRead) this.onRead(onRead);
  this._read(this.push);
};
Source.prototype.push = function (res) {
  this.onRead(Chunk(res));
};
Source.prototype.onRead = function (onRead) {
  this.onRead = onRead;
};
```

### Count

```js
const end = require('chunk').end;

function Count(start, end, step) {
  this.start = start;
  this.end = end;
  this.step = step;
  this.index = start;
  Source.call(this, this._read);
}
inherits(Count, Source);

Count.prototype._read = function () {
  this.index += this.step;
  if (this.index > this.end) return end();
  return this.index;
};
```

### FileRead

```js
const end = require('chunk').end;

function FileRead(filename) {
  this.filename = filename;
  Source.call(this, this._read);
}
inherits(FileRead, Source);

FileRead.prototype._read = function (push) {
  if (!this.fp) this.fp = fs.open(filename);

  fs.read(this.fp, this.start, this.size, push);
};
```


### Transform

```js
function Transform(transform){
}
Transform.prototype.read = function () {
  const chunk = this.source.read();
  if (chunk.next || chunk.end) return chunk;

  const res = this.transform(chunk);
  return Chunk(res);
};
```

### Feed

```js
function Feed(fn){
  this.fn;
}
Feed.prototype.start = function () {
  var chunk;
  while (chunk = this.source.read()) {
    if (chunk.next) continue;
    if (chunk.end) break;
    this.fn(chunk.data);
  }
};

Feed.prototype.start = function () {
  var chunk;
  const blocks = this.blocks()
  while (end) {
    var sources = this.sources;
    if (!this.async)
      chunk = read(sources)
      if (chunk.next) continue;
      if (chunk.end) break;
      this.fn(chunk.data);
  }
};
read(sources, chunk, i = 0) {
  var source;
  while (source = sources[i++]) {
    chunk = source.read(chunk)
    if (chunk.next) return chunk;
    if (chunk.end) return chunk;
  }
  return chunk;
}
read(sources, chunk, callback){
  var i = 0;
  var source
  while (source = sources[i++]){
    if (source.async)
      source.read(chunk, chunk => {
        if (chunk.next) return callback(chunk);
        if (chunk.end) return callback(chunk);
        read(sources.slice(i), chunk, callback);
      })
    else {
      chunk = source.read(chunk)
      if (chunk.next) return chunk;
      if (chunk.end) return chunk;
    }
  }
}
read(sources, chunk, callback){
  var i = 0;
  var source
  while (source = sources[i++]){
    if (source.async)
      source.read(chunk)
      .then(chunk => {
        if (chunk.next) return callback(chunk);
        if (chunk.end) return callback(chunk);
        read(sources.slice(i), chunk, callback);
      })
    else {
      chunk = source.read(chunk)
      if (chunk.next) return chunk;
      if (chunk.end) return chunk;
    }
  }
}


readAsync(source, chunk, callback) {
  source.read(chunk, () => {

  })
}
```
