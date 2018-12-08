//app.js
App({
  onLaunch: function () {
    var that = this;
    console.log('App Launch')
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 初始化全局变量
    that.globalData.isAuth = false;
    that.globalData.isLogin = false;
    that.globalData.isRegister = false;
    that.globalData.userRole = 1;
    console.log('isAuth:' + that.globalData.isAuth + ',isLogin:' + that.globalData.isLogin + ',isRegister:' + that.globalData.isRegister)
  },

  getUserInfo: function (cb) {
    var that = this
    if (JSON.stringify(this.globalData.userInfo) !== "{}") {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              console.log(res)
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },

  //get locationInfo
  getLocationInfo: function (cb) {
    var that = this;
    if (this.globalData.locationInfo) {
      cb(this.globalData.locationInfo)
    } else {
      wx.getLocation({
        type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
        success: function (res) {
          that.globalData.locationInfo = res;
          cb(that.globalData.locationInfo)
        },
        fail: function () {
          // fail
        },
        complete: function () {
          // complete
        }
      })
    }
  },

  //定义全局变量
  globalData: {
    urlPath: 'https://www.zhuhaojia360.com',
    wssPath: 'wss://www.zhuhaojia360.com/chat',
    userInfo: {},     //在授权Auth界面更新
    userRole:1,       //用户角色，管理员 0， 客户 1，技师 2
    locationInfo: null, //
    isAuth: 0,      //在授权Auth界面更新
    isRegister: 0,  //在注册Register界面更新
    openid: null,       //在登录Login界面更新，只针对微信用户
    isLogin:0,       //在登录Login界面更新
    userId:null    //当前登录用户ID，在登录界面更新，针对所有用户

    //peopleId: new Date().getTime()
  }
})