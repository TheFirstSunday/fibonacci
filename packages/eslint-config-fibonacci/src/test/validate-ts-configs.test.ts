/**
 * 验证 TS 规则，包括：
 * eslint-config-fiibonacci/typescript
 * eslint-config-fibonacci/typescript/react
 * eslint-config-fibonacci/typescript/vue
 */

const assert = require('assert');
const eslint = require('eslint');
const path = require('path');

function isObject(obj: any) {
  return typeof obj === 'object' && obj !== null;
}

describe('Validate TS configs', () => {
  it('Validate eslint-config-fibonacci/typescript', () => {
    const configPath = './typescript/index.ts';
    const filePath = path.join(__dirname, './fixtures/ts.ts');

    const cli = new eslint.CLIEngine({
      configFile: configPath,
      useEslintrc: false,
      ignore: false,
      parserOptions: {
        project: path.join(__dirname, './fixtures/tsconfig.json'),
      },
    });

    // 验证导出的 config 是否正常
    const config = cli.getConfigForFile(filePath);
    assert.ok(isObject(config));

    // 验证 lint 工作是否正常
    const reports = cli.executeOnFiles([filePath]);
    assert.ok(reports.errorCount !== 0 || reports.warnCount !== 0);

    // 验证 eslint-plugin-typescript 工作是否正常
    const results = reports.results[0];
    const errorReportedByReactPlugin = results.messages.filter((result: { ruleId: string | string[]; }) => {
      return result.ruleId && result.ruleId.indexOf('@typescript-eslint/') !== -1;
    });
    assert.notEqual(errorReportedByReactPlugin.length, 0);
  });

  it('Validate eslint-config-fibonacci/typescript/react', () => {
    const configPath = './typescript/react.ts';
    const cli = new eslint.CLIEngine({
      configFile: configPath,
      useEslintrc: false,
      ignore: false,
      parserOptions: {
        project: path.join(__dirname, './fixtures/tsconfig.json'),
      },
    });

    // 验证导出的 config 是否正常
    const filePath = path.join(__dirname, './fixtures/ts-react.tsx');
    const config = cli.getConfigForFile(filePath);
    assert.ok(isObject(config));

    // 验证对 tsx 工作是否正常
    const reports = cli.executeOnFiles([filePath]);
    assert.ok(reports.errorCount !== 0 || reports.warnCount !== 0);
    const results = reports.results[0];
    const errorReportedByReactPlugin = results.messages.filter((result: { ruleId: string | string[]; }) => {
      return result.ruleId && result.ruleId.indexOf('react/') !== -1;
    });
    const errorReportedByTSPlugin = results.messages.filter((result: { ruleId: string | string[]; }) => {
      return result.ruleId && result.ruleId.indexOf('@typescript-eslint/') !== -1;
    });
    assert.notEqual(errorReportedByReactPlugin.length, 0);
    assert.notEqual(errorReportedByTSPlugin.length, 0);

    // 验证 eslint-plugin-react-hooks plugin 工作是否正常
    const filePath2 = path.join(__dirname, './fixtures/react-hooks.jsx');
    const reports2 = cli.executeOnFiles([filePath2]);
    assert.ok(reports2.errorCount !== 0 || reports2.warnCount !== 0);
    const results2 = reports2.results[0];
    const errorReportedByReactPlugin2 = results2.messages.filter((result: { ruleId: string | string[]; }) => {
      return result.ruleId && result.ruleId.indexOf('react-hooks/') !== -1;
    });
    assert.equal(errorReportedByReactPlugin2.length, 2);
  });

  it('Validate eslint-config-fibonacci/typescript/taro', () => {
    const configPath = './typescript/taro.ts';
    const cli = new eslint.CLIEngine({
      configFile: configPath,
      useEslintrc: false,
      ignore: false,
      parserOptions: {
        project: path.join(__dirname, './fixtures/tsconfig.json'),
      },
    });

    // 验证导出的 config 是否正常
    const filePath = path.join(__dirname, './fixtures/ts-taro.tsx');
    const config = cli.getConfigForFile(filePath);
    assert.ok(isObject(config));

    // 验证对 tsx 工作是否正常
    const reports = cli.executeOnFiles([filePath]);
    assert.ok(reports.errorCount === 0 || reports.warnCount === 0);
  });

  it('Validate eslint-config-fibonacci/typescript/vue', () => {
    const configPath = './typescript/vue.ts';
    const filePath = path.join(__dirname, './fixtures/ts-vue.vue');

    const cli = new eslint.CLIEngine({
      configFile: configPath,
      useEslintrc: false,
      ignore: false,
      parserOptions: {
        project: path.join(__dirname, './fixtures/tsconfig.json'),
      },
    });

    // 验证导出的 config 是否正常
    const config = cli.getConfigForFile(filePath);
    assert.ok(isObject(config));

    // 验证 lint 工作是否正常
    const reports = cli.executeOnFiles([filePath]);
    assert.ok(reports.errorCount !== 0 || reports.warnCount !== 0);

    // 验证 eslint-plugin-vue 及 @typescript-eslint 工作是否正常
    const results = reports.results[0];
    const errorReportedByReactPlugin = results.messages.filter((result: { ruleId: string | string[]; }) => {
      return result.ruleId && result.ruleId.indexOf('vue/') !== -1;
    });
    const errorReportedByTSPlugin = results.messages.filter((result: { ruleId: string | string[]; }) => {
      return result.ruleId && result.ruleId.indexOf('@typescript-eslint/') !== -1;
    });
    assert.notEqual(errorReportedByReactPlugin.length, 0);
    assert.notEqual(errorReportedByTSPlugin.length, 0);
  });

  it('Validate eslint-config-fibonacci/essential/typescript', () => {
    const configPath = './essential/typescript/index.ts';
    const filePath = path.join(__dirname, './fixtures/ts.ts');

    const cli = new eslint.CLIEngine({
      configFile: configPath,
      useEslintrc: false,
      ignore: false,
      parserOptions: {
        project: path.join(__dirname, './fixtures/tsconfig.json'),
      },
    });

    // 验证导出的 config 是否正常
    const config = cli.getConfigForFile(filePath);
    assert.ok(isObject(config));

    // 验证 lint 工作是否正常
    const reports = cli.executeOnFiles([filePath]);
    assert.ok(reports.errorCount !== 0 || reports.warnCount !== 0);

    // 验证黑名单中的规则已关闭
    const results = reports.results[0];

    // 验证 @typescript-eslint/semi 被关闭
    const semiErrors = results.messages.filter((result: { ruleId: string; }) => {
      return result.ruleId === '@typescript-eslint/semi';
    });
    assert.equal(semiErrors.length, 0);

    // 验证一个风格问题被降级
    const styleErrors = results.messages.filter((result: { ruleId: string; }) => {
      return result.ruleId === 'object-curly-spacing';
    });
    assert.equal(styleErrors[0].severity, 1);
  });

  it('Validate eslint-config-fibonacci/essential/typescript/react', () => {
    const configPath = './essential/typescript/react.ts';
    const filePath = path.join(__dirname, './fixtures/ts-react.tsx');

    const cli = new eslint.CLIEngine({
      configFile: configPath,
      useEslintrc: false,
      ignore: false,
      parserOptions: {
        project: path.join(__dirname, './fixtures/tsconfig.json'),
      },
    });

    // 验证导出的 config 是否正常
    const config = cli.getConfigForFile(filePath);
    assert.ok(isObject(config));

    // 验证 lint 工作是否正常
    const reports = cli.executeOnFiles([filePath]);
    assert.ok(reports.errorCount !== 0 || reports.warnCount !== 0);

    // 验证对 tsx 工作是否正常
    const results = reports.results[0];
    const errorReportedByReactPlugin = results.messages.filter((result: { ruleId: string | string[]; }) => {
      return result.ruleId && result.ruleId.indexOf('react/') !== -1;
    });
    assert.notEqual(errorReportedByReactPlugin.length, 0);
    const errorReportedByTSPlugin = results.messages.filter((result: { ruleId: string | string[]; }) => {
      return result.ruleId && result.ruleId.indexOf('@typescript-eslint/') !== -1;
    });
    assert.notEqual(errorReportedByTSPlugin.length, 0);

    // 验证 @typescript-eslint/semi 被关闭
    const semiErrors = results.messages.filter((result: { ruleId: string; }) => {
      return result.ruleId === '@typescript-eslint/semi';
    });
    assert.equal(semiErrors.length, 0);

    // 验证黑名单中的规则已关闭，取 react/jsx-indent 进行测试
    const errorReportedByReactPluginBlackList = results.messages.filter((result: { ruleId: string; }) => {
      return result.ruleId === 'react/jsx-indent';
    });
    assert.equal(errorReportedByReactPluginBlackList.length, 0);
  });

  it('Validate eslint-config-fibonacci/essential/typescript/vue', () => {
    const configPath = './essential/typescript/vue.ts';
    const filePath = path.join(__dirname, './fixtures/ts-vue.vue');

    const cli = new eslint.CLIEngine({
      configFile: configPath,
      useEslintrc: false,
      ignore: false,
      parserOptions: {
        project: path.join(__dirname, './fixtures/tsconfig.json'),
      },
    });

    // 验证导出的 config 是否正常
    const config = cli.getConfigForFile(filePath);
    assert.ok(isObject(config));

    // 验证 lint 工作是否正常
    const reports = cli.executeOnFiles([filePath]);
    assert.ok(reports.errorCount !== 0 || reports.warnCount !== 0);

    // 验证 vue plugin 工作是否正常
    const results = reports.results[0];
    const errorReportedByReactPlugin = results.messages.filter((result: { ruleId: string | string[]; }) => {
      return result.ruleId && result.ruleId.indexOf('vue/') !== -1;
    });
    assert.notEqual(errorReportedByReactPlugin.length, 0);

    // 验证黑名单中的规则已关闭
    const errorReportedByReactPluginBlackList = results.messages.filter((result: { ruleId: string; }) => {
      return result.ruleId === '@typescript-eslint/indent';
    });
    assert.equal(errorReportedByReactPluginBlackList.length, 0);
  });

  it('Validate eslint-config-fibonacci/typescript/node', () => {
    const configPath = './typescript/node.ts';
    const filePath = path.join(__dirname, './fixtures/ts-node.ts');

    const cli = new eslint.CLIEngine({
      configFile: configPath,
      useEslintrc: false,
      ignore: false,
    });

    // 验证导出的 config 是否正常
    const config = cli.getConfigForFile(filePath);
    assert.ok(isObject(config));
    assert.strictEqual(config.env.node, true);
    assert.strictEqual(config.plugins.includes('node'), true);

    // 验证已开启的 link 规则是否校验正常
    const reports = cli.executeOnFiles([filePath]);
    const { messages } = reports.results[0];
    const ruleIds = Array.from(messages.map((item: { ruleId: any; }) => item.ruleId));

    assert.strictEqual(ruleIds.includes('node/prefer-promises/fs'), true);
    assert.strictEqual(ruleIds.includes('@typescript-eslint/no-unused-vars'), true);
    assert.strictEqual(ruleIds.includes('no-console'), true);
    assert.strictEqual(ruleIds.includes('no-var'), true);
    assert.strictEqual(ruleIds.includes('eol-last'), true);
    assert.strictEqual(reports.errorCount === 2 && reports.warningCount === 3, true);

    // 验证已关闭的 link 规则是否校验正常，以 @typescript-eslint/explicit-function-return-type 为例
    assert.strictEqual(ruleIds.includes('@typescript-eslint/explicit-function-return-type'), false);
  });
});
