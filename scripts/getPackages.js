const { readdirSync } = require('fs');
const { resolve } = require('path');

module.exports = function getPackages({ root }) {
  let pkgDeps = {};
  let depWeights = {};
  const rootPkg = require(resolve(root, 'package.json'));
  const pkgsPath = resolve(root, 'packages');
  // root package.json
  const { name, ignores = [] } = rootPkg;
  const packages = readdirSync(pkgsPath).filter((dirName) =>
    /^[a-z-]*$/g.test(dirName) && dirName !== 'fibonacci-lint',
  );

  for (const package of packages) {
    // pakage package.json
    const pkg = require(resolve(pkgsPath, package, 'package.json'));
    const dependencies = {
      ...pkg.peerDependencies,
      ...pkg.dependencies,
    };
    pkgDeps[package] = Object.keys(dependencies).filter((key) =>
      new RegExp(`^@${name}\/`).test(key),
    );
  }

  // 寻找package依赖权重
  Object.keys(pkgDeps).forEach((key) => {
    let weight = 0;
    const deps = pkgDeps[key];
    const stack = [...deps];
    while (stack.length) {
      const dep = stack.pop();
      weight += 1;
      const pkgName = dep.replace(new RegExp(`^@${name}\/`), '');
      if (typeof depWeights[pkgName] !== 'undefined') {
        weight += depWeights[pkgName];
      } else {
        pkgDeps[pkgName] &&
          pkgDeps[pkgName].forEach((dep) => {
            stack.push(dep);
          });
      }
    }
    depWeights[key] = weight;
  });

  return Object.keys(depWeights)
    .filter((key) => !~ignores.indexOf(key))
    .sort((a, b) => depWeights[a] - depWeights[b]);
};
