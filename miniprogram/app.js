//app.js
const config = require("./config.js");
const defaultTime = {
  defaultWorkTime: 5,
  defaultRestTime: 5
}

App({
  onLaunch: function() {
    let workTime = wx.getStorageSync('workTime')
    let restTime = wx.getStorageSync('restTime')
    if(!wx.cloud){
      console.error('请使用2.2.3或以上的基础库以使用云能力')
    }
    else{
      wx.cloud.init({
        raceUser:true,
      })
    }
    if (!workTime) {
      wx.setStorage({
        key: 'workTime',
        data: defaultTime.defaultWorkTime
      })
    }
    if (!restTime) {
      wx.setStorage({
        key: 'restTime',
        data: defaultTime.defaultRestTime
      })
    }
  }
})