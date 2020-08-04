const path = require('path')

module.exports = {
  pluginOptions: {
    quasar: {
      importStrategy: 'manual',
      rtlSupport: false
    }
  },
  publicPath: '/layout-creator/',
  configureWebpack (cfg) {
    cfg.resolve.alias['@oarepo/data-editor-jsonschema'] =
      path.join(__dirname, 'library/index.js')
  },
  transpileDependencies: [
    'quasar'
  ]
}
