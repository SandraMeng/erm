// gzip压缩
const CompressionWebpackPlugin = require("compression-webpack-plugin");

module.exports = {
  lintOnSave: false,
  // 配置跨域代理
  devServer: {
  	proxy: "http://localhost:3000"
  },
  configureWebpack: config => {
        const plugins = [];

        // Begin 生成 gzip 压缩文件
        plugins.push(
            new CompressionWebpackPlugin({
                filename: "[path].gz[query]",
                algorithm: "gzip",
                test: /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i,
                threshold: 10240,
                minRatio: 0.8
            })
        );
        config.plugins = [...config.plugins, ...plugins];
    }
}
