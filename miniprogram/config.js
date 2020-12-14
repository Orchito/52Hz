const config={
  alianceKey:"4O6bJFnuQycvOnLl",//后台分配的allianceKey
  dev:{//开发环境
    domain:"http://127.0.0.1:8000/api/wechat",//后台接口地址
    qiniuDomain:"https://img.wx-union.cn",//七牛地址
    bgImage:"tmp/wx0f587d7c97a68e2b.o6zAJs3oh85Zb1lJE8oWix57vny0.91gGjMXALWNEf6b9dd803a7fe4bf5f75b6afd5705a73.jpg"//个人中心背景图片
  },
  prod:{//生产环境
    domain: "https://mp.wx-union.cn/api/wechat",//后台接口地址
    qiniuDomain: "https://img.wx-union.cn",//七牛地址
    bgImage: "tmp/wx0f587d7c97a68e2b.o6zAJs3oh85Zb1lJE8oWix57vny0.91gGjMXALWNEf6b9dd803a7fe4bf5f75b6afd5705a73.jpg"//个人中心背景图片
  }
}

const domain = config.prod.domain;
//const domain = config.dev.domain;

const qiniuDomain = config.prod.qiniuDomain;
const bgImage = config.prod.qiniuDomain;
const alianceKey = config.alianceKey;
const region = 'SCN';

const TX_MAP_KEY = 'MECBZ-DH2W6-MTUSC-MV3E2-3HXYZ-RRFXI';//腾讯地图开发者ID

module.exports = {
  domain, qiniuDomain, bgImage, alianceKey, TX_MAP_KEY, region
}
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
}