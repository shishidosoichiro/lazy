# オーディオプレイヤーという遊び

## CUI

- 基本的にCUIアプリ
- コマンドラインとしても利用可
- CUIでは幾つかのモードに切り替えて使用する
- 主なモード
  - 再生モード
  - リストモード
- 再生リスト
  - 常に単独の再生リストがバックグラウンドに存在する
  - その順番に沿って再生する
  - ユーザはその再生リストに挿入・削除・更新することで曲の切り替えや選曲を行う
- スロット
  - 0,1,2,...と名前がついている
  - 0 が現在再生中のスロット
  - 1 が次に再生されるスロット。以下同


## カレントスロット

現在操作しているスロット

```sh
cs
slot
```

## スロット移動

```sh
chs [slot number]
slot [slot number]
```

## 楽曲ディレクトリ操作

```sh
pwd
cd
ls
```

##

```sh

cd
```


```js
const equalizer = _.equalizer({band: 5});
const analyzer = _.analyzer({band: 5});

_
.audio(args[0])
.pipe(equalizer)
.pipe(analyzer)
.pipe(_.speaker())

_.keyboard()
_.each((code) => {
  switch (code) {
    case 'up':
      equalizer.volume(equalizer.volume() + 5);
      break;
    case 'down':
      equalizer.volume(equalizer.volume() - 5);
      break;
    case 'left':
      equalizer.band(equalizer.band() - 1)
      break;
    case 'right':
      equalizer.band(equalizer.band() + 1)
      break;
  }
})
```
