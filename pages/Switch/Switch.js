// pages/Contact/Contact.js

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userRole:2    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 跳转到阿姨页面，而且不能马上返回
   */
  toSkills: function(){
    app.globalData.userRole = 2;
    wx.reLaunch({
      url: '../Skills/Skills'
    })
  },

  toThings: function(){
    app.globalData.userRole = 1;
    wx.reLaunch({
      url: '../Things/Things'
    })
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
      userRole: app.globalData.userRole,
      isAuth: app.globalData.isAuth,
      isLogin: app.globalData.isLogin,
      isRegister: app.globalData.isRegister
    });
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