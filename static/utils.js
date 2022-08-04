import { Loading, Notification } from 'element-ui'

let loadingInstance = null

// 验证是不是日期
var verifyDate = function(date) {
  return (/^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/.test(date));
}

// fil 转换
const formatFil = function(fil, unit = false, cent = 4) {
  if (fil == null || fil == undefined || fil === '') {
    return '--'
  }
  // let _fil = formatterAmount(parseInt(fil) / Math.pow(10, 18), cent)
  let _fil = formatterAmount(fil, cent)
  return unit ? (_fil + ' FIL') : fil
}

// fil 转换
const formatTrueFil = function(fil, unit = false, cent = 4) {
  if (fil == null || fil == undefined || fil === '') {
    return '--'
  }
  let _fil = formatterAmount(parseInt(fil) / Math.pow(10, 18), cent)
  return unit ? (_fil + ' FIL') : fil
}

// power 转换
const formatPower = function(power, unit = false, fixed = 2, maxUnit = 'BiB') {
  if (power == null || power == undefined || power == '') {
    return '0'
  }
  let _unit = ['B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB', 'BiB']
  let _magn = [Math.pow(1024, 0), Math.pow(1024, 1), Math.pow(1024, 2), Math.pow(1024, 3), Math.pow(1024, 4), Math.pow(1024, 5), Math.pow(1024, 6), Math.pow(1024, 7), Math.pow(1024, 8), Math.pow(1024, 9)]
  let _negative = false
  if (Math.abs(power) != power) {
    _negative = true
    power = Math.abs(power)
  }
  let _max = _unit.indexOf(maxUnit)
  let _power = ''
  let _index = 0
  _magn.map((per, index) => {
    if (power >= per && _max >= index) {
      _power = (power / per).toFixed(fixed)
      _index = index
    }
  })
  if (unit) {
    _power = formatterAmount(_power, fixed) + ' ' + _unit[_index]
  }
  return _negative ? ('-' + _power) : _power
}

// 格式化金额显示
const formatterAmount = function(num, cent = 4) {
  if (num == undefined || num == null || num == '' || num == '.') {
    return '0'
  }

  // 去掉逗号
  num = num.toString().replace(/,/g, '')

  // 去掉小数点之后多余的0
  if (parseFloat(num) == parseInt(num)) {
    num = parseInt(num)
  } else if (parseFloat(num) == parseFloat(num) * 10 / 10) {
    num = parseFloat(num) * 10 / 10
  } else {
    num = parseFloat(num)
  }
  let cents = num.toString().split('.')[1]

  // 保留2位小数
  if (cents) {
    cents = cents.substring(0, cent)
  }
  num = Math.floor(num).toString()
  for (let i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
    num = `${num.substring(0, num.length - (4 * i + 3))},${num.substring(num.length - (4 * i + 3))}`
  }
  return num + (cents ? '.' + cents : '')
}

// 格式化overview
const formatOverview = function(data, unit = '') {
  if (data == undefined || data == null || data === '') {
    return '--'
  }
  if (unit) {
    return data + ' ' + unit
  }
  return data
}

const formatTime = function(sec) {
  let s = sec % 60
  let m = (sec % (60 * 60) - s) / 60
  let h = (sec % (24 * 60 * 60) - (m * 60) - s) / (60 * 60)
  let d = (sec % (30 * 24 * 60 * 60) - (h * 3600) - (m * 60) - s) / (24 * 60 * 60)
  let M = (sec % (12 * 30 * 24 * 60 * 60) - (d * 24 * 3600) - (h * 3600) - (m * 60) - s) / (30 * 24 * 60 * 60)
  //
  let _s = `${s < 10 ? '0' + s : s}秒`
  let _m = `${m < 10 ? '0' + m : m}分`
  let _h = `${h < 10 ? '0' + h : h}小时`
  let _d = `${d < 10 ? '0' + d : d}天`
  let _M = `${M < 10 ? '0' + M : M}月`
  //
  if (sec < 60) {
    return _s + '之前'
  }
  if (sec < 60 * 60) {
    return _m + _s + '之前'
  }
  if (sec < 24 * 60 * 60) {
    return _h + _m + _s + '之前'
  }
  if (sec < 30 * 24 * 60 * 60) {
    return _d + _h + _m + _s + '之前'
  }
  return _M + _d + _h + _m + _s + '之前'
}

// 补零
const addZero = function(data) {
  let temp = data + ''
  if (temp.length === 0) {
    return '00'
  } else if (temp.length === 1) {
    return '0' + temp;
  } else {
    return data
  }
}

// 格式化时间
const formatDate = function(date, format) {
  let str = "",
    year = addZero(date.getFullYear()),
    month = addZero(date.getMonth() + 1),
    day = addZero(date.getDate()),
    hours = addZero(date.getHours()),
    minutes = addZero(date.getMinutes()),
    seconds = addZero(date.getSeconds())

  switch (format) {
    case 'y-m-d':
      str = `${year}-${month}-${day}`
      break
    case 'y.m.d':
      str = `${year}.${month}.${day}`
      break
    case 'h:m:s':
      str = `${hours}:${minutes}:${seconds}`
      break
    case 'y/m/d':
      str = `${year}/${month}/${day}`;
      break
    case '年月日':
      str = `${year}年${month}月${day}日`
      break
    case 'm-d':
      str = `${month}-${day}`;
      break
    case 'h:m':
      str = `${hours}:${minutes}`
      break
    case 'm/d h:m':
      str = `${month}/${day} ${hours}:${minutes}`
      break
    default:
      str = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
      break
  }
  return str
}

// 显示加载Loading
const showElmLoading = function() {
  loadingInstance = Loading.service({
    background: '#252B4DAA'
  })
}

// 关闭加载Loading
const closeElmLoading = function() {
  loadingInstance.close();
}

// 成功的通知
const notifySuccess = function(msg) {
  Notification.success({
    title: '成功',
    message: msg,
  })
}

// 失败的通知
const notifyError = function(msg) {
  Notification.error({
    title: '错误',
    message: msg
  })
}

// 获取指定时间 多少天之内的全部日期
const getDateMiusDays = function(date, days) {
  let time = date.getTime()
  let dates = []
  for (let i = 0; i <= days; i++) {
    let before30Time = time - (60 * 60 * 24 * 1000 * i)
    let newDate = new Date(before30Time)
    let year = addZero(newDate.getFullYear())
    let month = addZero(newDate.getMonth() + 1)
    let day = addZero(newDate.getDate())
    dates.push(`${year}-${month}-${day}`)
  }
  return dates.reverse()
};

const keyDownF11 = (event) => {
  if (event.keyCode === 122) {
    event.returnValue = true;
    window.location.reload();
  }
};

export default {
  verifyDate,

  formatFil,
  formatTrueFil,
  formatPower,
  formatterAmount,
  formatOverview,
  formatTime,
  formatDate,

  showElmLoading,
  closeElmLoading,
  notifySuccess,
  notifyError,

  getDateMiusDays,

  keyDownF11,
}
