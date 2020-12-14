
Page({
  data:{
   imgUrls:['../../images/rice1.jpg','../../images/snow.jpg','../../images/eatrice.jpg']
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
  }
})
  