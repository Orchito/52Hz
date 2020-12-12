//index.js
const app = getApp()
Page({
  data:{
      animation:"",
      countDown: '00分00秒',  // 定义初始展示的时间
      canIUse:wx.canIUse('button.open-type.getUserInfo'),
     
  
  },
  onShow: function() {
    console.log('index---------onShow()')
      this.animation = wx.createAnimation({
      duration: 1400,
      timingFunction: 'linear', // "linear","ease","ease-in","ease-in-out","ease-out","step-start","step-end"
      delay: 0,
      transformOrigin: '50% 50% 0',
      success: function(res) {
        console.log("res")
      }
    })
    var n = 0,
    that = this;
  this.interval = setInterval(function () {
          n++;
          that.rotateAni(n);
  }, 1400);
 


  },
rotateAni: function (n) {
    console.log("rotate=="+n)
    this.animation.rotate(180*(n)).step()
    this.setData({
      animation: this.animation.export()
    })
},
onLoad:function(){
  var util=require("../../utils/dist.js")
  let time = util.formatDate(new Date());
  let date=util.getDates(7, time);
  console.log(date);
  this.setData({
    date:time
  })
 
wx.playBackgroundAudio({
  dataUrl: ' http://music.163.com/song/media/outer/url?id=3882876.mp3',
title: '',
coverImgUrl: '../../images/music.png',
}),
wx.getSetting({
  success:function(res){
    if(res.authSetting['scope.userInfo'])
    wx.getUserInfo({success:function(res){
      console.log(res.userInfo)
    }
})
}
})
}, 
handleCountdown() {
            var activity_remain = '',
              now = new Date().getTime(),  // 获取当前时间
              end_time = this.data.activity_end / 1000;
            activity_remain = end_time - (now / 1000);
            var that = this;
            that.setData({
              countDown: that.dateformat(activity_remain)
            });
            // 渲染倒计时时钟
            timer1 = setTimeout(function () {
                that.handleCountdown(that);
                that.setData({
                  end_time: end_time - 1
                })
              }, 1000)
            if (activity_remain <= 0) {
              clearTimeout(timer1);
              let countDown = '00分00秒'
              that.setData({
                countDown: countDown
              })
              return false;
            }
      },
      //  格式化时间
       dateformat(micro_second) {
            // 总秒数
            var second = Math.floor(micro_second);
            // 小时
      var hr = Math.floor(second / 3600 % 24);
            // 分钟
            var min = Math.floor(second / 60 % 60);
            // 秒
            var sec = Math.floor(second % 60);
            if (min < 10) {
              min = "0" + min;
            }
            if (sec < 10) {
              sec = "0" + sec;
            }
            return min + "分" + sec + '秒';
        },
      })

