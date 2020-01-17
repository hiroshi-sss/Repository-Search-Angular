# RepositoriesSearchAPIAngularについて
GitHubのAPIを使用し、リポジトリの検索を行うアプリケーションです。

## 実行コマンド
npm run start

## 追加したパッケージ
npm install bootstrap --save

## 参考サイト
[Angular](https://angular.jp/)

[RxJs](https://rxjs-dev.firebaseapp.com/)

[Bootstrap4](https://getbootstrap.com/)

[コンポーネント間の共有について](https://qiita.com/ksh-fthr/items/e43dd37bff2e51e95a59)

[スピナーの表示について](https://www.l08084.com/entry/2019/09/22/193345)

## 参考書籍
![Angular アプリケーションプログラミング画像](https://wings.msn.to/books/978-4-7741-9130-0/978-4-7741-9130-0.jpg 'Angular アプリケーションプログラミング')

Angular アプリケーションプログラミング

Angular アプリケーションプログラミング

## ディレクトリ構成
- app.component
   - search
      - nav-search.component
      - result.component
      - items.component
      - favorites.component
   - service
      - common.service
      - http.service
   - model
      - response.model

## 設計書

1. DesignDocuments
![DesignDocuments](src/assets/img/DesignDocuments.jpg 'DesignDocuments')

2. DetailedDesignDocuments
![DetailedDesignDocuments](src/assets/img/DetailedDesignDocuments.jpg 'DetailedDesignDocuments')

## 役割
- app.component

親として子コンポーネントを４つ作成
子コンポーネントのレイアウトは、こちらのコンポーネントで調整

- nav-search.component

リポジトリ検索用のコンポーネント

- reslut.component

検索されたデータを表示するコンポーネント

- items.component

reslut.component で選択したデータを表示するコンポーネント

- favorites.component

items.component で追加したデータを表示するコンポーネント

- common.service

共通で使用するメソッド、データを管理をまとめたサービス

- http.service

http通信が発生するものをまとめたサービス

- response.model

GitHubAPI のレスポンスで使用する値の型を定義しているもの
