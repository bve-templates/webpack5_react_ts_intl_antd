/**
 * 服务器配置
 * https://webpack.docschina.org/configuration/dev-server/
 */

const path = require('path');

module.exports = {
  // 一切服务都启用gzip 压缩
  // 本地开发，如果开启会导致文件下载慢，因为有些大文件需要加密解密，这种算法占用很多时间
  compress: true,
  // 指定要监听请求的端口号
  port: 8080,
  // 如果你有单独的后端开发服务器 API，并且希望在同域名下发送 API 请求 ，那么代理某些 URL 会很有用。
  proxy: {
    '/api/*': {
      target: 'https://www.nftest.cc', // 'https://www.nftest.cc',
      changeOrigin: true,
    },
  },
  // 指定使用一个 host。默认是 localhost。如果你希望服务器外部可访问，指定如下：
  host: '0.0.0.0',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Method': 'POST,GET',
  },
  // 启动后打开浏览器
  open: false,
  client: {
    // 将运行进度输出到控制台。
    progress: true,
    /// 当出现编译错误或警告时，在浏览器中显示全屏覆盖。
    overlay: true,
  },
  static: {
    // 告诉服务器从哪里提供内容。
    directory: path.resolve(__dirname, './dist/'),
    serveIndex: true,
  },
  // 当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html。通过传入以下启用：
  historyApiFallback: {
    rewrites: [],
  },
};
