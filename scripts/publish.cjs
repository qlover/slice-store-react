const { copyFileSync } = require('fs');
const { join } = require('path');
const pkg = require('../package.json');
const pathConfig = require('../config/path.config.cjs');

function publishWithLocal() {
  const files = pkg.files.filter((file) => file !== pathConfig.buildDir);
  for (const file of files) {
    const src = join(pathConfig.rootPath, file);
    const dest = join(pathConfig.buildRoot, file);
    copyFileSync(src, dest);
  }
}

module.exports = { publishWithLocal };
