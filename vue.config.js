const registerRouter = require('./backend/router')

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        // 全局引入变量和 mixin
        additionalData: `
          @import "@/assets/scss/variable.scss";
          @import "@/assets/scss/mixin.scss";
        `
      }
    }
  },
  devServer: {
    before(app) {
      registerRouter(app)
    }
  },
  configureWebpack: (config) => {
    if (process.env.npm_config_report) {
      const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
      config.plugins.push(new BundleAnalyzerPlugin())
    }
  },
  productionSourceMap: false,
  publicPath: process.env.NODE_ENV === 'production' ? '/music-next/' : '/'
}

// location /music-next/ {
//   proxy_set_header X-Real-IP $remote_addr;
//   proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
//   proxy_set_header Host $http_host;
//   proxy_set_header X-NginX-Proxy true;
//   proxy_pass http://127.0.0.1:9002/;
// }
