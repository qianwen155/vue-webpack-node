const qiniu = require('qiniu')
// const proc = require('process')

var config = {
  QINIU_ACCESS_KEY: '4T2AQVW4Nxv-PRQ5RNiPgmT3UFDIdyxpcramLtxY',
  QINIU_SECRET_KEY: 'CvB19Ci0Kfw5tXbx8zxOrEGV16v1p3ru07ZVFQjq',
  QINIU_TEST_BUCKET: 'image'
}

var accessKey = config.QINIU_ACCESS_KEY
var secretKey = config.QINIU_SECRET_KEY
var mac = new qiniu.auth.digest.Mac(accessKey, secretKey)

var bucket = config.QINIU_TEST_BUCKET

// 简单上传凭证
var options = {
  scope: bucket
}
var putPolicy = new qiniu.rs.PutPolicy(options)
var qiniuToken = putPolicy.uploadToken(mac)
console.log(qiniuToken)

