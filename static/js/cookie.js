function cookie (name, value, options) {
  if (typeof value !== 'undefined') {
    options = options || {}
    // 如果值为null, 删除cookie
    if (value === null) {
      value = ''
      options = {
        expires: -1
      }
    }
    // 设置有效期
    var expires = ''
    if (options.expires && (typeof options.expires === 'number' || options.expires.toGMTString)) {
      var date
      if (typeof options.expires === 'number') {
        date = new Date()
        date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000))
      } else {
        date = options.expires
      }
      expires = ';expires=' + date.toGMTString()
    }
    var path = options.path ? ';path=' + (options.path) : ''
    var domain = options.domain ? ';domain=' + (options.domain) : ''
    var secure = options.secure ? ';secure' : ''
    // 设置cookie
    document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('')
  } else {
    // 读取cookie
    if (document.cookie.length > 0) {
      var start = document.cookie.indexOf(name + '=')
      if (start !== -1) {
        start = start + name.length + 1
        var end = document.cookie.indexOf(';', start)
        if (end === -1) {
          end = document.cookie.length
        }
        return decodeURIComponent(document.cookie.substring(start, end))
      }
    }
    return ''
  }
}

export default cookie
