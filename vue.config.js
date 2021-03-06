
const ProjectConfig = require("./project.config")
//让打包的时候输出可配置的文件
var GenerateAssetPlugin = require('generate-asset-webpack-plugin');
var createServerConfig = function(compilation){
  let cfgJson = {
    // 默认指向 window.location.origin
    baseURL:"",
  };
  return JSON.stringify(cfgJson);
}

module.exports = {
  publicPath: ProjectConfig.publicPath,
  productionSourceMap: false,
  configureWebpack: {
    plugins: [
      new GenerateAssetPlugin({
        filename: 'serverconfig.json',
        fn: (compilation, cb) => {
            cb(null, createServerConfig(compilation));
        },
        extraFiles: []
      })
    ]
  },
  pages: {
    index: {
      // page 的入口
      entry: 'src/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: ProjectConfig.title
    }
  }
}
