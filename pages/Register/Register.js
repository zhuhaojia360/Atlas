// pages/Register/Register.js

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
    passwordAgain: '',
    passwordAgainPhold: '请再次密码',

    userInfo: '',
    isAuth: false,
    isLogin: false,
    isRegister: false
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

  //获取再次输入的密码
  onGetPasswordAgain: function(e) {
    this.setData({
      passwordAgain: e.detail.value
    });
  },

  //注册
  onRegister: function(e) {
    var that = this;
    var myreg = /^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$$/; //正则表达式检验电话号码
    //所有输入不为空
    if (that.data.account != '' && that.data.password != '' && that.data.passwordAgain != '') {
      if (that.data.account.length == 11 && myreg.test(that.data.account)) {
        if (that.data.password.length >= 6) {
          if (that.data.password == that.data.passwordAgain) {
            //1、登陆，获取code
            wx.login({
              success: function(res) {
                console.log(res);
                //账号及密码信息
                let account = that.data.account;
                let password = that.data.password;
                //发送 res.code 到后台换取openId, sessionKey, unionId，获取encryptedData和iv
                let errMsg = res.errMsg;
                let code = res.code;
                //2、获取用户信息
                if (code) {
                  wx.getUserInfo({
                    success: function(res) {
                      //更新用户信息
                      app.globalData.userInfo = res.userInfo;
                      //用于校验
                      let rawData = res.rawData;
                      let signature = res.signature;
                      let encryptedData = res.encryptedData;
                      let iv = res.iv;
                      //3、发起请求
                      wx.request({
                        url: app.globalData.urlPath +'/onRegister.php',
                        method: 'POST',
                        data: {
                          //输入账号及密码信息
                          account: account,
                          password: password,
                          //用于解密、验证的信息
                          code: code,
                          rawData: rawData,
                          signature: signature,
                          encryptedData: encryptedData,
                          iv: iv,
                        },
                        header: {
                          'content-type': 'application/x-www-form-urlencoded',
                          //'Accept': 'application/json'
                        },
                        success: function(res) {
                          //console.log(res);            
                          if (res.statusCode == 200) {
                            if(res.data.isRegister==0){
                              wx.showToast({
                                title: '网络开小差了',
                                duration: 2000
                              })
                            } else if(res.data.isRegister==1){
                              app.globalData.isLogin = res.data.isLogin;
                              app.globalData.isRegister = res.data.isRegister;
                              app.globalData.isAuth = res.data.isAuth;
                              app.globalData.userId = res.data.userId;
                              wx.showToast({
                                title: '注册成功',
                                duration: 2000
                              })
                              setTimeout(function () {
                                wx.switchTab({
                                  url: '../My/My',
                                })
                              }, 2000);
                            } else if(res.data.isRegister == 2) { //针对微信用户如果已经注册则会直接登录，此场景暂时不会出现
                              wx.showToast({
                                title: '用户已存在',
                                duration: 2000
                              })
                              setTimeout(function () {
                                wx.navigateTo({
                                  url: '../Login/Login',
                                })
                              }, 2000);
                            }
                          } else {
                            wx.showToast({
                              title: '网络开小差了',
                              duration: 2000
                            })
                          }
                        },
                        fail: function(res) {
                          wx.showModal({
                            title: '提示',
                            content: '注册失败2'
                          })
                        },
                        complete: function(res) {
                          console.log(res)
                        }
                      })
                    },
                    fail: function (res) {
                      console.log(res)
                      wx.showModal({
                        title: '提示',
                        content: '尚未进行授权，请点击确定跳转到授权页面进行授权',
                        success: function(res){
                          if(res.confirm){
                            console.log('用户点击确定')
                            wx.navigateTo({
                              url: '../Auth/Auth'
                            })
                          }
                        }
                      })
                    },
                    complete: function (res) {
                      console.log(res)
                    }
                  })
                }
              },
              fail: function (res) {
                wx.showModal({
                  title: '提示',
                  content: '用户登录并获取code失败'
                }),
                  console.log(res)
              },
              complete: function (res) {
                console.log(res)
              }
            })
          } else {
            wx.showModal({
              title: '提示',
              content: '两次输入密码不一致'
            })
          }
        } else {
          wx.showModal({
            title: '提示',
            content: '密码少于6位请重设'
          })
        }
      } else {
        wx.showModal({
          title: '提示',
          content: '手机号码格式不正确'
        })
      }
    } else {
      wx.showModal({
        title: '提示',
        content: '请把资料填写完整'
      })
    }

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