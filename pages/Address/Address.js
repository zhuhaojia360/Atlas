// pages/Address/Address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  addAddress: function(){
    //var id = e.currentTarget.dataset.id; //打印可以看到，此处已获取到了对应的id
    wx.navigateTo({
      //url: './AddAddress/AddAddress?objectId=' + id
      url: './AddAddress/AddAddress'
    })
  },

  updateAddress:function(){
    //var id = e.currentTarget.dataset.id; //打印可以看到，此处已获取到了对应的id
    wx.navigateTo({
      //url: './AddAddress/AddAddress?objectId=' + id
      url: './UpdateAddress/UpdateAddress'
    })
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