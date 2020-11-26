//index.js
const app = getApp()

Page({
  data:{
      animation:""
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
onload:function(){
  const innerAudioContext = wx.createInnerAudioContext();

innerAudioContext.autoplay = true;
innerAudioContext.src = '../../videos/sea.mp3';
innerAudioContext.loop = true;
innerAudioContext.play();
}
    



})