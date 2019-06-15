# vue-suggest-ui-sample

## コマンド

### セットアップ

```
yarn install
```

### 開発コマンド

```
yarn run serve
```

## 仕様

### 概要

検索画面（URL：`/`）にて入力フォームが存在。入力フォームに文字を入力すると候補がサジェストされ、候補を選択すると詳細画面（URL：`/item/:id`）へ遷移

### API

#### /api/item/list

##### パラメータ

|key|type|other|
|:----|:----|:----|
|keyword|string|検索キーワード|
|count|int|最大何件返すか|

##### レスポンス

```json
{
  "keyword": "米",
  "items": [
    {
      "item_id": 1,
      "item_name": "無洗米 あきたこまち"
    },
    {
      "item_id": 2,
      "item_name": "無洗米 コシヒカリ"
    },
    {
      "item_id": 3,
      "item_name": "精米 コシヒカリ"
    },
    {
      "item_id": 4,
      "item_name": "白米 コシヒカリ"
    },
    {
      "item_id": 5,
      "item_name": "精米 風さやか"
    },
  ]
}
```

#### /api/item/:id

##### レスポンス

```json
{
  "item_id": 1,
  "item_name": "白米 コシヒカリ",
  "item_price": 2480
}
```
