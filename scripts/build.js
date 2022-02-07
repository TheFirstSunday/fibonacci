const { resolve } = require('path');
const chalk = require('chalk');
const { readdirSync, lstatSync } = require('fs');
const { rollup, watch } = require('rollup');
const randomColor = require('randomcolor');
const signale = require('signale');
const getRollupConfig = require('./getRollupConfig');
const getPackages = require('./getPackages');
const { ROLLUP_TYPE_WATCH } = require('./constants');

const rollupType = process.env.ROLLUP_TYPE;

function getRandomColor() {
  return randomColor({ luminosity: 'light', count: 27 });
}

function log(text, color) {
  const currentColor = color || getRandomColor();
  console.log(chalk.hex(currentColor).visible(text));
}

function getEntryFileName(packagePath) {
  const src = resolve(packagePath, 'src');
  const entryFile = readdirSync(src).filter(
    (fileName) =>
      /^index\.(js|ts|tsx)$/.test(fileName) &&
      lstatSync(resolve(src, fileName)).isFile(),
  )[0];

  return `${src}/${entryFile}`;
}

async function rollupBuild({ color, package, rollupConfigs, entryFileName }) {
  log(`start build package ${package}...`, color);
  // run rollup build
  for (const rollupConfig of rollupConfigs) {
    const { output, ...inputOptions } = rollupConfig;
    const bundle = await rollup({
      ...inputOptions,
      input: entryFileName,
    });
    await bundle.write(output);
  }
  log(`package ${package} build success`, color);
}

async function rollupWatch({ color, package, rollupConfigs, entryFileName }) {
  return new Promise((resolve, reject) => {
    let watchOptions = Array.isArray(rollupConfigs)
      ? rollupConfigs
      : [rollupConfigs];
    // only build cjs
    watchOptions = watchOptions
      .map((watchOption) => ({
        ...watchOption,
        input: entryFileName,
        watch: {
          include: ['src/**'],
          exclude: ['**/node_modules/**', '*.md'],
        },
      })) // watch mode only build cjs
      .filter(({ output }) => output.format === 'cjs');
    const watcher = watch(watchOptions);
    watcher.on('event', ({ error, code }) => {
      if (error) {
        signale.error(error);
        reject();
      } else if (code === 'BUNDLE_END') {
        resolve();
        log(`[${package}]: file changed has build`, color);
      }
    });
    process.once('SIGINT', () => {
      watcher.close();
    });
  });
}

async function build({ root, package }) {
  const packagePath = resolve(root, 'packages', package);
  process.chdir(packagePath);
  const rollupConfigs = getRollupConfig();
  const entryFileName = getEntryFileName(packagePath);
  const rollupStart =
    rollupType === ROLLUP_TYPE_WATCH ? rollupWatch : rollupBuild;
  const color = getRandomColor();

  return rollupStart({
    color,
    package,
    rollupConfigs,
    entryFileName,
  });
}

async function lernaBuild() {
  const root = resolve(__dirname, '../');
  const packages = getPackages({ root });
  try {
    for (const package of packages) {
      await build({ root, package });
    }
  } catch (e) {
    signale.error(e);
  }
}

lernaBuild();
