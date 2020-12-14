const util = require('../../config')

Page({
  data:{
   imgUrls:['../../images/g1.jpg','../../images/g2.jpg','../../images/g3.jpg'],
   Label:'',
      logs:[],
      userinfo:{},
      openid:''
  },
  
  imageUpload(){
    var that = this;
//选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        that.upImgs(tempFilePaths[0],0);
      }
    })
  },
//上传图片
  upImgs: function (imgurl, index) {
    var that = this;
    wx.uploadFile({
      url: api.image_upload,//
      filePath: imgurl,
      name: 'file',
      header: {
        'content-type': 'multipart/form-data'
      },
      formData: null,
      success: function (res) {
        var data = JSON.parse(res.data);
        var data2 = JSON.parse(data.data);
        that.setData({
          picPath: data2.path
        })
        wx.showToast({
          title: '图片上传成功',
          icon: 'success',
          duration: 2000
        })
      }
    })
  },
   //选择音频
  startRecode: function () {
    var that = this;
    console.log("start");
    wx.startRecord({
      success: function (res) {
        console.log(res);
        var tempFilePath = res.tempFilePath;
        that.setData({
          recodePath: tempFilePath, 
          isRecode: true 
        });
      },
      fail: function (res) {
        console.log("fail");
        console.log(res);
        //录音失败
      }
    });
  },
  endRecode: function () { //结束录音 
    var that = this;
    console.log("end");
    wx.stopRecord();
    that.setData({ 
      isRecode: false
    });
    // wx.showToast();
    setTimeout(function () {
      console.log(that.data.recodePath);
      wx.uploadFile({
        url: api.audio_upload,//上传接口
        filePath: that.data.recodePath,
        name: 'file',
        header: {
          'content-type': 'multipart/form-data'
        },
        success: function (res) {
          var str = res.data;
          var data = JSON.parse(str);
          if (data.states == 1) {
            var cEditData = s.data.editData;
            cEditData.recodeIdentity = data.identitys;
            that.setData({ editData: cEditData });
          }
          else {
            wx.showModal({
              title: '提示',
              content: '上传成功',
              showCancel: false,
              success: function (res) {
 
              }
            });
          }
          wx.hideToast();
        },
        fail: function (res) {
          console.log(res);
          wx.showModal({
            title: '提示',
            content: "网络请求失败，请确保网络是否正常",
            showCancel: false,
            success: function (res) {
 
            }
          });
          wx.hideToast();
        }
      });
    }, 1000)
  },
//选择视频
videoUpload : function () {
    var that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: 'back',
      success: function (res) {
        that.setData({
          video: res.tempFilePath,
          size: (res.size / (1024 * 1024)).toFixed(2)
        })
        // 调用上传接口
      }
    })
  },
  toupper:function(){
    console.log("触发了toupper");
  },
  liuyan:function(e){
    this.data.Label=e.detail.value;
  },
  getlogs:function(){
    var that = this
    const ui = wx.getStorageSync("userinfo")
    if(!ui.openid)
    {
      wx.switchTab({
        url: '/pages/companion/companion',
      })
    }
    else{
      wx.cloud.callFunction({
        name:"getlogs",
        success:res=>{
          
          that.setData({
            logs:res.result.data.map(log=>{
              var date = util.formatTime(new Date(log.date))
              log.date=date
              return log
            })
          })
        },
        fail:res=>{
          console.log("res",res)
        }
      })
    }
    
  },
  addLabel(){
    
    var that=this
    var a = that.data.Label
    const ui = wx.getStorageSync('userinfo')
    if(!ui.openid){
      wx.switchTab({
        url: '/pages/home/home',//如果没有授权则跳转至授权页面
      })
    }
    else{
      wx.cloud.callFunction({
        name:"creatlog",
        data:{
          label:a,
          date:Date.now(),
          openid:ui.openid,
          name:ui.nickName,
          avatar:ui.avatarUrl
        }
      })
      that.onShow();
    }
    
  }, 
  onLoad:function(){
    
  },
  onShow: function () {
    this.getlogs()
    } 
})


  