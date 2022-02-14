/**
 * 开发环境独有配置
 * 不同与其它环境的配置
 */
const path = require('path');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  // 环境变量
  mode: 'development',
  // 服务器配置
  devServer: require('./devServer'),
  plugins: [
    // 分析工具 需要时开启
    // new BundleAnalyzerPlugin({ openAnalyzer: false }),
  ],
};
