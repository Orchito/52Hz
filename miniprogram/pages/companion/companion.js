Page({
  data: {
    userinfo:{},
    openid:null
  },
  onLoad: function() {
    const ui=wx.getStorageSync('userinfo')//获取key为"userinfo"的缓存信息
    this.setData({
      userinfo:ui,
      openid:ui.openid
    })
  },
  onShow:function(){
    
  },
  login:function(e){
    var that=this
    wx.cloud.callFunction({//调用名为“name"的云函数
      name:"login",
      data:{},
      success:res=>{
        
        that.setData({
          openid:res.result.openid,
          userinfo:e.detail.userInfo
        })
        that.data.userinfo.openid=that.data.openid
        console.log(that.data.userinfo)
        wx.setStorageSync('userinfo', that.data.userinfo)//把userinfo放到缓存中，key为userinfo
      },
      fail:res=>{
        console.log("fail")
      }
    })
  } 
})