// pages/Auth/Auth.js

//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userInfo: '',
    isAuth: false,
    isLogin: false,
    isRegister: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  //获取用户信息
  bindGetUserInfo: function(e) {
    var that = this;
    if (e.detail.userInfo) {
      //用户按了允许按钮
      console.log('授权成功')
      //更新Auth信息
      app.globalData.isAuth = 1;
      //app.globalData.isLogin = 1;
      //更新userInfo信息
      app.globalData.userInfo = e.detail.userInfo;
      //console.log('isAuth:' + app.globalData.isAuth);
      //console.log('userInfo:' + app.globalData.userInfo);
      if (!app.globalData.isLogin) {
        //通过微信直接登录
        that.onWxLogin();
      }
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '提醒',
        content: '您点击了拒绝授权，将无法进入小程序，请授权后再进入',
        showCancel: false,
        confirmText: '返回授权',
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击了"返回授权"')
          }
        }
      })
    }
  },

  //判断是否已经绑定电话号码
  onWxLogin: function() {
    //1、登陆，获取code
    wx.login({
      success: function(res) {
        console.log(res);
        //发送 res.code 到后台换取 openId, sessionKey, unionId，获取encryptedData和iv
        let code = res.code;
        let errMsg = res.errMsg;
        //2、获取用户信息
        wx.getUserInfo({
          success: function(res) {
            console.log(res);
            //获取encryptedData和iv信息，以便校验
            let encryptedData = res.encryptedData;
            let iv = res.iv;
            let rawData = res.rawData;
            let signature = res.signature;
            //用于验证，微信登录时密码和账号为空
            let account = ''; 
            let password = '';
            //更新userInfo信息到全局变量以便调用
            wx.request({
              url: app.globalData.urlPath + '/onLogin.php',
              method: 'POST',
              data: {
                //用于解密、验证的信息
                code: code,
                encryptedData: encryptedData,
                iv: iv,
                rawData: rawData,
                signature: signature,
                account: account,
                password: password,
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
              },
              success: function(res) {
                //console.log(res)
                if (res.statusCode == 200) {
                  //console.log(res.data);
                  if (res.data.isRegister == 1) {
                    app.globalData.isLogin = res.data.isLogin;
                    app.globalData.isAuth = res.data.isAuth;
                    app.globalData.isRegister = res.data.isRegister;
                    app.globalData.userId = res.data.userId;
                    setTimeout(function() {
                      wx.switchTab({
                        url: '../My/My'
                      })
                    }, 2000);
                    wx.showToast({
                      title: '登录成功',
                      duration: 2000
                    });
                  } else if(res.data.isRegister == 0 ){
                    app.globalData.isLogin = res.data.isLogin;
                    app.globalData.isAuth = res.data.isAuth;
                    app.globalData.isRegister = res.data.isRegister;
                    wx.navigateTo({
                      url: '../Register/Register',
                    })
                  } else {
                    wx.showModal({
                      title: '提示',
                      content: '登录失败1'
                    })
                  }
                }
              },
              fail: function(res) {
                //console.log('wx.request fail:' + res)
                //console.log('系统错误')
                wx.showModal({
                  title: '提示',
                  content: '登录失败2'
                })
              },
              complete: function(res) {
                console.log('wx.request complete:' + res);
              }
            })
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;
    that.setData({
      userInfo: app.globalData.userInfo,
      isAuth: app.globalData.isAuth,
      isLogin: app.globalData.isLogin,
      isRegister: app.globalData.isRegister
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})