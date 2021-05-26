これは[`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app)で作られた[Next.js](https://nextjs.org/)プロジェクトです。

デプロイ先-> [https://react-graph-sample.vercel.app/](https://react-graph-sample.vercel.app/)

## ローカルで動かす方法

```bash
git clone git@github.com:ogadra/ReactGraphSample.git
cd ReacgGraphSample
npm init
npm run dev
```
-> [http://localhost:3000](http://localhost:3000)

## Jest テストを行う
```bash
npm run jest
```

## ファイル説明

- `./src/pages/index.tsx`
    - トップページのファイルです。
- `./src/pages/api/resas.tsx`
    - ResasAPIをサーバーサイドでfetchするためのファイルです。
- `./src/components/select.tsx`
    - 都道府県のチェックボックスを表示するコンポーネントです。
- `./src/components/graph.tsx`
    - 人口のグラフを表示するコンポーネントです。
- `./src/components/addData.tsx`
    - 人口データをfetchするためのファイルです。
- `./src/components/Checkbox.module.css`
    - チェックボックスのデザインを整えるCSSファイルです。
- `./src/components/select.test.tsx`
    - チェックボックスの動作を確認するテストファイルです。
