// pages/Login/Login.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    account: '',
    accountPhold: '请输入11位手机号码',
    password: '',
    passwordPhold: '请输入密码',

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

  //获取输入的账号
  onGetAccount: function(e) {
    this.setData({
      account: e.detail.value
    });
  },

  //获取输入的密码
  onGetPassword: function(e) {
    this.setData({
      password: e.detail.value
    });
  },

  //登录按钮
  onLogin: function() {
    //输入框不为空
    let that = this;
    if (that.data.account == '' || that.data.password == '') {
      wx.showModal({
        title: '提示',
        content: '请把信息填写完整'
      })
    } else {
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
              let account = that.data.account;
              let password = that.data.password;
              //更新userInfo信息到全局变量以便调用
              app.globalData.userInfo = res.userInfo;             
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
                  console.log(res)
                  if (res.statusCode == 200) {
                    console.log(res.data);
                    if (res.data.isAuth == 1 && res.data.isLogin == 1) {
                      app.globalData.isLogin = res.data.isLogin;
                      app.globalData.isAuth = res.data.isAuth;
                      setTimeout(function() {
                        wx.switchTab({
                          url: '../My/My'
                        })
                      }, 2000);
                      wx.showToast({
                        title: '登录成功',
                        duration: 2000
                      });
                    } else {
                      wx.showModal({
                        title: '提示',
                        content: '账号或密码错误'
                      })
                    }
                  }
                },
                fail: function(res) {
                  console.log('wx.request fail:' + res)
                  console.log('系统错误')
                  wx.showModal({
                    title: '提示',
                    content: '账号或密码错误'
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
    }
  },

  //注册按钮
  onRegister: function(e) {
    wx.navigateTo({
      url: '../Register/Register'
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