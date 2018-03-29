var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://gateway-dev.lexing360.com"',
  QINIU_API: '"http://pay-dev.lexing360.com"'
})
