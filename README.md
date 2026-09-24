# class-tools

授業で使うブラウザ教材の置き場です。インストール不要で、PC・iPad のブラウザからそのまま開けます。

トップページ（科目を選ぶ）：https://hs-note.github.io/class-tools/

科目ごとの道具箱（生徒に配る QR はこちら）

| 科目 | 開く |
|---|---|
| 情報Ⅰ | https://hs-note.github.io/class-tools/joho1/ |
| 情報Ⅱ | https://hs-note.github.io/class-tools/joho2/ |

| 教材 | 科目 | 開く |
|---|---|---|
| 文字コードビューア（Unicode・UTF-8・UTF-16・Shift_JIS を16進数で／文字化け） | 情報Ⅰ | https://hs-note.github.io/class-tools/charcode/ |
| 音のデジタル化シミュレーター（標本化・量子化・符号化／データ量） | 情報Ⅰ | https://hs-note.github.io/class-tools/sound/ |
| 色の表現シミュレーター（光の三原色・カラーコード・階調） | 情報Ⅰ | https://hs-note.github.io/class-tools/color/ |
| 画像のデジタル化シミュレーター（画素・解像度・階調／画像と動画のデータ量） | 情報Ⅰ | https://hs-note.github.io/class-tools/image/ |
| 信頼区間シミュレーター（区間推定の「区間」の意味／輪投げ） | 情報Ⅱ | https://hs-note.github.io/class-tools/interval/ |

## 教材を足すとき

`lib/toolbox.js` の `TOOLS` に1件足すだけ。科目ページとトップの両方に反映され、QR も自動で作られる。
科目を増やすときは、同じファイルの `SUBJECTS` に足して、`joho1/index.html` をコピーして `data-page` と見出しを変える。

## 使わせてもらっているもの

- QR コードの生成：[qrcode-generator](https://github.com/kazuhikoarase/qrcode-generator)（Copyright (c) 2009 Kazuhiko Arase／MIT License）→ `lib/qrcode-generator/`（ライセンス全文は同じフォルダの `LICENSE`）
- 「QR コード」は株式会社デンソーウェーブの登録商標です。