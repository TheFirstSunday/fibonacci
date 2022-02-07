# Fibonacci

---

> Fibonacci, 通用工具集合, 采用 monorepo 管理模式。Fibonacci 主要基于 dumi、yarn workspaces、lerna、umi-test、typescript 搭建。

## 如何使用

```
yarn add @fibonacci${packageName}
```

## 如何开发

项目 package.json scripts 已经集成开发阶段大部分常用的操作。在实际开发中，只需执行 scripts 即可。

> 注意：所有的 npm scripts，请通过 yarn 来执行， yarn workspace 模式会自动 link 子模块，如果通过 npm 执行 scripts，大部分命令会报错。

```json
{
  "scripts": {
    "bootstrap": "lerna bootstrap",
    "start": "dumi dev",
    "watch": "lerna run watch --parallel",
    "build": "lerna run build",
    "build:docs": "dumi build",
    "test": "umi-test",
    "test:coverage": "umi-test --coverage",
    "test:debug": "node --inspect-brk node_modules/.bin/umi-test",
    "version": "lerna version --conventional-commits --no-push",
    "publish": "lerna publish  from-git",
    "publish:force": "lerna publish  from-package"
  }
}
```

## 安装

bootstrap 会自动调用 yarn 安装依赖，并自动对所有的 subpackage 进行 link。

```shell
git clone https://github.com/TheFirstSunday/fibonacci.git
cd fibonacci
yarn bootstrap
```

## 启动本地服务

start 会启动 dumi 本地 server

```shell
yarn start
```

## 新增 subpackage

新增 subpackage 后记得运行 lerna bootstrap

## 构建 subpackage

subpackage 主要通过 babel 编译 以及 tsc 生成声明文件。开发时，在项目目录下执行 watch scripts 即可自动监听并编译。

```shell
cd packages/${subpackageName}
yarn watch
```

如需手动执行 build, 执行 yarn build 即可。

**如何扩展 tsconfig.json 配置?**

每个 subpackage 目录中都包含 tsconfig.json 配置，根据需要自行修改配置即可

**如何扩展 babal 配置？**

Babel 7.x 的版本，已经对 monorepo 有比较好的支持，支持 root 项目 以及 packages 项目的 babel 配置。如需扩展 babel 配置，在项目中创建 .babelrc.json 文件，会自动继承 root babel 配置。

参考文档：[babel monorepos](https://babeljs.io/docs/en/config-files#monorepos)

## 编写 Demos

fibonacci 主要通过 dumi 来提供 demo 的能力。dumi 支持在 README 文档中编写或引入 demo，非常方便维护以及与 Demos 文档的集成。

dumi 支持两种类型的 demo：

- 代码块，在 markdown 中，编写 jsx、tsx 代码块，dumi 会自动转成 demo
- 外部引入，通过 code 标签引入，适用于较大型的 demo

demo 可以有两种类型的展现形式：

- 嵌入式，直接渲染，无法查看源码
- box 类型，类似 antd 的 demo，外部包围了一层 box，可以方便查看源码。

demo 的使用，可参考项目中 自带 subpackage 中 demo 的编写。更多 demo 相关的文档，请参考 [dumi](https://d.umijs.org/guide/demo-principle)

**代码块 Demo**

````js
```jsx | inline; // 如添加 inline 标记 即为嵌入式demo

import React from 'react';

export default () => <h1 style={{ color: '#555' }}>Hello World!</h1>;

```;
````

**外部引入 Demo**

```js
<code src="/path/to/Demo.tsx" />
<code src="/path/to/Demo.tsx" inline /> // 嵌入式
```

## 单元测试

单元测试功能主要通过集成 umi-test & jest 来实现。

subpackages 单元测试文件 需要存放在 项目中 `__tests__`目录中，且后缀名为 `.spec.ts`.

单元测试中引入方式与 demo 一致，直接通过包名引入即可。项目 commit hooks 中，已集成单元测试检测，提交代码前会先执行单元测试检测。

如需单独执行单元测试 或者 生成覆盖率文档，直接在项目跟目录执行对应 scripts 即可.

```shell
yarn test
yarn test:coverage
```

## 编写文档

完善的文档，能够方便开发童鞋使用，文档请直接使用 subpackage 中的 README.md 文件编写， 文档建议包含如下部分内容：

```md
- Features
- Installation
- Demos
- API
  - Properties
```

**如何控制文档站点中文档的显示顺序**

dumi 提供 FrontMatter 可以灵活控制 文档显示的标题以及顺序。在文档的顶部可以配置 FrontMatter 属性：

```js
---
title: '' //用于配置该页面的标题，将会被用作该页面标题的子标题以及左侧菜单。
sidemenu: true //控制侧边栏菜单的显示或隐藏。
order: 1 // 控制该文档的显示顺序，数值越小排序越靠前。
---
```

具体可参考 [Markdown 支持的 FrontMatter 配置项](https://d.umijs.org/config/frontmatter#title).

### 发布

发布需要通过两部操作来完成。

**bump version**

在根目录中执行 version 命令，version 会自动处理如下过程：

- 根据 commit 的文件内容，区分出本次修改的 subpackages 列表。
- 针对每个 subpackage, 根据 commit message 来确定发布的版本
- 修改 subpackage package.json 中的版本，生成 changelog 并提交 commit
- 添加对应的 git tag

包版本以及 changelog 日志，都是通过 commit message 来生成，所以请务必保证您的 commit message 符合 Commit Message 规范，强烈建议您通过 [git-cz](https://github.com/commitizen/cz-cli) 来提交 commit message.

version 生成规则如下:

- 如果 commit 记录中，存在 breaking change，则 bump 大版本号
- 如果 commit 记录中，存在 feature 类型 message，则 bump 子版本号
- 如果 commit 记录中，存在 fix 类型 message，则 bump fix 版本号

```shell
yarn version
```

**publish**

执行 version 操作后，请手动检测版本以及影响的 package，如确定没有问题后，则可执行 publish 操作。

```shell
yarn publish
// 如果publish出错，可尝试使用force模式。
yarn publish:force
```

发布完成后，记得推送代码以及 tag

```
git push
git push origin --tags
```

## 部署文档

文档站点部署在独立的服务器中，已通过 webhook 实现自动构建部署。
