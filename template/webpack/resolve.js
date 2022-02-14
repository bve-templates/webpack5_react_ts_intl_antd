/**
 * 这些选项能设置模块如何被解析
 *
 */
const path = require('path');

module.exports = {
  // 自动解析确定的扩展
  extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  symlinks: false,
  fallback: {
    // crypto: path.resolve("/node_modules", "crypto-browserify"),
    // stream: path.resolve("/node_modules", "stream-browserify"),
    // vm: path.resolve("/node_modules", "vm-browserify"),
    // assert: path.resolve("/node_modules", "assert/"),
    // http: path.resolve("/node_modules", "stream-http"),
    // https: path.resolve("/node_modules", "https-browserify"),
    // os: path.resolve("/node_modules", "os-browserify/browser"),
    crypto: require.resolve('crypto-browserify'),
    stream: require.resolve('stream-browserify'),
    vm: require.resolve('vm-browserify'),
    assert: require.resolve('assert/'),
    http: require.resolve('stream-http'),
    https: require.resolve('https-browserify'),
    os: require.resolve('os-browserify/browser'),
  },
  modules: ['./src/', 'node_modules'],
  // 目录别名
  alias: {
    '@': path.resolve('./src/'),
  },
};
