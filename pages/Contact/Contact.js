// pages/Contact/Contact.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: 'https://mmbiz.qpic.cn/mmbiz_jpg/YphmANsbXN3JChXfWsYbCzHKNDbAxbsFPj7iatY2XGsP1zwPFY0viaWoZzsmyE6sCHvpyC4VQxgtuAe3Dey4ahvQ/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  onImageClick: function(event) {
    // wx:wx.scanCode({
    //   onlyFromCamera: false,
    //   success: function(res) {},
    //   fail: function(res) {},
    //   complete: function(res) {},
    // })
    var images = ["https://mmbiz.qpic.cn/mmbiz_jpg/YphmANsbXN3JChXfWsYbCzHKNDbAxbsFPj7iatY2XGsP1zwPFY0viaWoZzsmyE6sCHvpyC4VQxgtuAe3Dey4ahvQ/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1"];
    var id = event.target.id;
    var url = images[id - 1];

    wx.previewImage({
      current: url,
      urls: images,
    })

  },

  onPhoneCall: function(event) {
    wx.makePhoneCall({
      phoneNumber: '18670011098',
    })
  },

  onCopyTBL: function(e) {
    wx.setClipboardData({
      data: '18670011098',
      success: function(res) {
        wx.getClipboardData({
          success: function(res) {
            console.log(res.data)
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