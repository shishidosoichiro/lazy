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
