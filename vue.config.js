const areaId = require('./AreaId.json')

const city = areaId.city

module.exports = {
  configureWebpack: {
    devServer: {
      before(app) {
        app.get('/api/city', function (req, res) {
          res.json({ areaId: city })
        })
      },
      proxy: {
        "/github": {
          target: "http://is.snssdk.com/api/news/feed/v51/",
          pathRewrite: { "^/github": "" }
        },
        "/movieapi": {
          target: "https://api-m.mtime.cn/",
          changeOrigin: true,
          pathRewrite: { "^/movieapi": "" }
        },
        "/details": {
          target: "https://ticket-api-m.mtime.cn/",
          changeOrigin: true,
          pathRewrite: { "^/details": "" }
        },
        // https://apis.map.qq.com/
        "/tmap": {
          target: "https://apis.map.qq.com/",
          changeOrigin: true,
          pathRewrite: { "^/tmap": "" }
        },
      }
    }
  }
}