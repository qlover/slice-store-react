const { join } = require('path');

/**
 * 项目根路径
 */
const rootPath = join(__dirname, '../');

/**
 * scripts 根目录
 */
const srcriptsRootPath = join(rootPath, 'scripts');

const buildDir = 'dist';

module.exports = {
  rootPath,
  srcriptsRootPath,
  buildDir,
  buildRoot: join(rootPath, buildDir)
};
