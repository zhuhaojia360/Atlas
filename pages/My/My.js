// pages/My/My.js

//获取应用实例
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: '',
    isAuth: false,
    isLogin: false,
    isRegister: false,
    tips: '点击头像授权并登录获取更多信息',
    count: 0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**授权登录 */
  onAuth: function() {
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

  /**查看用户详情 */
  onDetail: function() {
    wx.navigateTo({
      url: '../MyDetail/MyDetail'
    })
  },

  onAddress:function(){
    wx.navigateTo({
      url: '../Address/Address'
    })
  },

  onContact: function () {
    wx.navigateTo({
      url: '../Contact/Contact'
    })
  },

  onSwitch:function(){
    wx.navigateTo({
      url: '../Switch/Switch'
    })
  },

  /**发布活儿 */
  onLogin: function() {
    wx.navigateTo({
      url: '../Login/Login'
    })
  },

  /**发布活儿 */
  onThings: function() {
    wx.navigateTo({
      url: '../ReleaseThings/ReleaseThings'
    })
  },

  /**发布本事 */
  onSkills: function() {
    wx.navigateTo({
      url: '../ReleaseSkills/ReleaseSkills'
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
    });
    that.onApplyCount();
  },

  //获取所有活动信息
  onApplyCount: function() {
    let that = this;
    let acceptId = app.globalData.objectId;
    //3、发起请求
    wx.request({
      url: app.globalData.urlPath + '/onApplyCount.php',
      method: 'POST',
      data: {
        acceptId: acceptId
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      success: function(res) {
        console.log('Request success res.data:' + res.data);
        if (res.statusCode == 200) { //http网络请求，200代表成功
        if(res.data>0){
          that.setData({
            count:res.data
          })
        }
        }
        /*wx.showToast({
          title: '查询成功',
          duration: 2000
        })*/
      },
      fail: function(res) {
        wx.showModal({
          title: '提示',
          content: '查询失败'
        })
      },
      complete: function(res) {
        console.log(res)
      }
    })
  },

  onAcceptDetail:function(){
    wx.navigateTo({
      url: '../MyAccept/MyAccept',
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