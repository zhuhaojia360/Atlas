// pages/Order/Order.js

//获取应用实例
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    shownavindex: 3,
    onPaying:'待支付',
    onVisiting:'待服务',
    onProcessing:'进行中',
    onMarking:'待评价',
    onAll:'全部订单',

    items:[],

    userInfo: '',
    isAuth: false,
    isLogin: false,
    isRegister: false,
    tips: '还未登录无法查看订单，喵~',
    notes:'还没订单赶快去下单吧，喵~',
    count: 0
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
    });
    //that.onApplyCount();
  },

  /**授权登录 */
  onAuth: function () {
    var that = this;
    console.log('isAuth: ' + app.globalData.isAuth)
    if (!app.globalData.isAuth) {
      wx.navigateTo({
        url: '../Auth/Auth',
      })
    } else {
      wx.navigateTo({
        url: '../Login/Login',
      })
    }
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