import fs from 'fs';
import path from 'path';
import pkg from './package.json';

const pkgDirName = 'packages';

const packageNames = fs
  .readdirSync(path.resolve(__dirname, pkgDirName))
  .filter((dirName) => /^[a-z-]*$/g.test(dirName));

const resolveSrcPath = (dirName: string) => `./${pkgDirName}/${dirName}/src`;

const getPackageAlias = () =>
  packageNames.reduce((next, dirName) => {
    const aliasName = `@${(pkg as any).name}/${dirName}`;
    const pkgPath = resolveSrcPath(dirName);
    (next as any)[aliasName] = path.resolve(__dirname, pkgPath);
    return next;
  }, {});

export default {
  title: 'Fibonacci',
  hash: true,
  devServer: {
    port: 8200,
  },
  alias: getPackageAlias(),
  mode: 'site',
  resolve: {
    includes: ['./'],
  },
};
