//获取应用实例
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: '',
    nickName:'昵称',
    isAuth: false,
    isLogin: false,
    isRegister: false,
    tips: '点击头像授权并登录获取更多信息'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    that.setData({
      userInfo: app.globalData.userInfo,
      isAuth: app.globalData.isAuth,
      isLogin: app.globalData.isLogin,
      isRegister: app.globalData.isRegister
    })
  },

  //登出按钮
  onLogout: function (e) {
    let that = this;
    that.setData({
      userInfo: null,
      isAuth: false,
      isLogin: false,
      isRegister: false
    })
    //app.globalData.userInfo = null;
    app.globalData.isAuth = 0;
    app.globalData.isLogin = 0;
    //app.globalData.isRegister = 1;
    wx.switchTab({
      url: '../My/My',
    })
    /**wx.request({
      url: app.globalData.urlPath +'/onLogout.php',
      method: 'POST',
      data: {
        //用于解密、验证的信息
        code: code,
        encryptedData: encryptedData,
        iv: iv
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        //'Accept': 'application/json'
      },
      success: function (res) {
        console.log(res);
        let onStatus = res.data.status;
        console.log(onStatus)
        if (onStatus == 100) {
          console.log(res.data);
          wx.setStorageSync('openid', '');
          wx.setStorageSync('isLogin', '');
        }
        wx.setStorageSync('openid', '');
        wx.showToast({
          title: '登出成功',
          duration: 2000
        })
        setTimeout(function () {
          wx.switchTab({
            url: '../My/My?openid=' + openid
          })
        }, 2000);
      },
      fail: function (res) {
        console.log('wx.request fail:' + res)
        console.log('系统错误')
        wx.showModal({
          title: '提示',
          content: '登出失败'
        })
      },
      complete: function (res) {
        console.log('wx.request complete:' + res);
      }
    })**/
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})