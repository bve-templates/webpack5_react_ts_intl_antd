/**
 * 生产环境独有配置
 * 不同与其它环境的配置
 */
const WorkboxPlugin = require('workbox-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  // 环境变量
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [`...`, new CssMinimizerPlugin()],
  },
  output: {
    publicPath: '/',
    filename: '[name].[contenthash:5].js',
  },
  plugins: [
    // gzip
    new CompressionPlugin({
      filename: '[path][base].gz',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 0,
      minRatio: 0.8,
    }),
    // // css抽取
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:5].css',
      chunkFilename: '[id].[contenthash:5].css',
    }),

    // new WorkboxPlugin.GenerateSW({
    //   // importWorkboxFrom: "local",
    //   // swSrc: "src/service-worker.js",
    //   // swDest: "service-worker.js",
    //   cacheId: `PC-${pkg.name}`, // 设置前缀
    //   skipWaiting: true, // 强制等待中的 Service Worker 被激活
    //   clientsClaim: true, // Service Worker 被激活后使其立即获得页面控制权
    //   swDest: 'service-wroker.js', // 输出 Service worker 文件
    //   exclude: ['.DS_Store', 'service-wroker.js'],
    //   // include: ["**/*.{html,js,css,png,jpg}"], // 匹配的文件
    //   // globIgnores: ["service-wroker.js"], // 忽略的文件
    //   // dontCacheBustURLsMatching: /\w{4}\./,
    //   runtimeCaching: [
    //     // 配置路由请求缓存
    //     {
    //       urlPattern: /.*\.(js|html|css|jpg|gif|png|jpe?g|svg|woff|ttf|eot)/, // 匹配文件
    //       handler: 'StaleWhileRevalidate', // 网络优先
    //     },
    //     // {
    //     //   urlPattern: /api/, // 匹配文件
    //     //   handler: 'NetworkFirst', // 网络优先
    //     // },
    //   ],
    // }),
  ],
};
