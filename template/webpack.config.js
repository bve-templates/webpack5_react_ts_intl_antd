const webpack = require('webpack');
const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const tsImportPluginFactory = require('ts-import-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const { checkEnv } = require('./webpack/generate');

const envConfigPath = path.resolve('webpack', `env.${process.env.NODE_ENV}.js`);
// 检测环境变量
checkEnv(envConfigPath);

// 开发环境
const isDev = process.env.NODE_ENV === 'development';

const sassLoader = {
  loader: 'sass-loader',
  options: {
    additionalData: (content, loaderContext) => {
      const { resourcePath } = loaderContext;
      if (
        !resourcePath.includes('/src/styles/') &&
        !resourcePath.includes('/node_modules/') &&
        !resourcePath.endsWith('.css')
      ) {
        return `@use "sass:math";@import "src/styles/variable.scss";` + content;
      }
      return content;
    },
  },
};

module.exports = merge(
  {
    output: {
      clean: true,
      assetModuleFilename: '[name].[contenthash:5][ext][query]',
    },
    optimization: {
      moduleIds: 'deterministic',
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /\/node_modules\//,
            name: 'vendors',
            chunks: 'all',
          },
          styles: {
            name: 'styles',
            test: /\.(scss|css)$/,
            chunks: 'all',
          },
        },
      },
    },
    module: {
      rules: [
        {
          test: /\.html$/,
          loader: 'html-loader',
          exclude: [path.resolve(__dirname, 'node_modules')],
        },
        {
          test: /\.jsx?$/,
          exclude: [path.resolve(__dirname, 'node_modules')],
          loader: 'babel-loader',
        },
        {
          test: /\.tsx?$/,
          exclude: [path.resolve(__dirname, 'node_modules')],
          loader: 'ts-loader',
          options: {
            // 指定特定的ts编译配置，为了区分脚本的ts配置
            // configFile: path.resolve(__dirname, "./tsconfig.json"),
            transpileOnly: true,
            getCustomTransformers: () => ({
              before: [
                tsImportPluginFactory([
                  {
                    libraryName: 'antd',
                    libraryDirectory: 'lib',
                    style: 'css',
                  },
                ]),
              ],
            }),
            compilerOptions: {
              module: 'es2015',
            },
          },
        },
        {
          test: /.s?css$/,
          use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: isDev
                    ? '[path][name]__[local]'
                    : '[hash:base64:3]',
                },
              },
            },
            'postcss-loader',
            sassLoader,
          ],
        },
        {
          test: /\.svg$/,
          include: [path.resolve(__dirname, `src/assets/svgs`)],
          use: [
            {
              loader: 'svg-sprite-loader',
              options: {
                // esModule: false,
                // extract: true,
                symbolId: 'icon-[name]', // filePath => path.basename(filePath)
                // runtimeCompat: true
              },
            },
            'svgo-loader',
          ],
        },
        {
          test: /\.(eot|ttf|woff|woff2)$/,
          type: 'asset/resource',
        },
        {
          test: /\.(gif|png|ico|jpe?g|svg)$/i,
          type: 'asset/resource',
          // 排除自身的svg
          // 排除自身外的assets_XXX目录，不然其它app的assets依旧会被打包
          exclude: path.resolve(__dirname, `src/assets/svgs`),
        },
      ],
    },
    resolve: require('./webpack/resolve'),
    stats: require('./webpack/stats'),
    plugins: [
      new webpack.ProgressPlugin({ percentBy: 'entries' }),
      // 处理HTML
      new HtmlWebpackPlugin({
        filename: 'index.html',
        hash: isDev,
        template: path.resolve(__dirname, 'src/index.html'),
        favicon: path.resolve(__dirname, 'src/assets/images/favicon.ico'),
      }),
      // 设置环境变量信息
      new webpack.DefinePlugin({
        'process.env': {
          BUILD_ENV: JSON.stringify(process.env.NODE_ENV),
        },
      }),
      new ScriptExtHtmlWebpackPlugin({
        inline: /runtime~.+\.js$/,
      }),
      // 字体demo不需要被打包
      new webpack.IgnorePlugin({
        checkResource(resource) {
          if (
            resource.endsWith('/iconfont/demo.css') ||
            resource.endsWith('/iconfont/demo_index.html')
          ) {
            return true;
          }
          return false;
        },
      }),
    ],
    devtool: false,
  },
  /**
   * 跟据环境加载不同配置
   * production 生产环境
   * development 开发环境
   */
  require(envConfigPath),
);
