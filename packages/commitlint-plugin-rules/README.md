## commitlint-plugin-rules

fiture commitlint 插件，用于开发自定义 commitlint rule

## Install

```shell
yarn add -D commitlint-plugin-rules
```

## Configure

```js
// commitlint.config.js
module.exports = {
  plugins: ['commitlint-plugin-rules'],
  extends: ['jagile'],
  rules: [
    ...
  ]
}
```

## Rules

### jagile-id-not-empty

message type 为 feat、fix 时，subject 必须以 jagileid 开头，jagileid 的校验正则为：

```js
const regex = /^[A-Z]+_?[A-Z]+-\d+.*\S+$/;
// RD_WEB-123, RD_APP-123123, RD-123123, X_D-123123
```

### scope-not-empty

message type 为 feat、fix 时，scope 不能为空
