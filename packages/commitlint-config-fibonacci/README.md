# commitlint-config

commitlint 规则配置

## Install

```shell
yarn add -D commitlint-config-fibonacci
```

## Configure

```js
// commitlint.config.js
module.exports = {
  extends: ['commitlint-config-fibonacci'],
  rules: [
    ...
  ]
}
```

## Rules Config

默认集成了 @commitlint-plugin-rules 插件以及 @commitlint/config-conventional 规则配置。

- jagile-id-not-empty： subject 在 type 为 fix、feat 时, 必须以 jagileid 开头
- scope-not-empty: scope 在 type 为 fix、feat 时不能为空
- scope-case, scope 支持下滑线、横线、大小写格式

```js
{
  'jagile-id-not-empty': [2, 'always'],
  'scope-not-empty': [2, 'always'],
  'scope-case': [
    2,
    'always',
    ['lower-case', 'snake-case', 'upper-case', 'kebab-case'],
  ],
  'subject-case': [0]
  ],
}
```
