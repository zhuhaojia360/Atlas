// pages/SkillsDetail/SkillsDetail.js
//获取应用实例
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    objectId: '', //当前本事ID
    items: [],
    count: 0,
    hasMore: true,
    isHideLoadMore: true,
    currentPage: 1, //当前页码
    sumPage: 1, //总页码，后台会返回
    pageSize: 5, //每页显示多少条数据
    loadingTip: '上拉加载更多',

    //requestId:'',
    thingsId:'',
    acceptId:'',
    requestId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    //获取当前本事的objectId
    that.setData({
      thingsId: options.thingsId,
      acceptId: options.acceptId,
      requestId: app.globalData.objectId,
    });
  },

  //马上预约阿姨
  onBookingAyi: function(e) {
    let that = this;
    let requestId = that.data.requestId; //当前用户ID
    console.log(requestId);
    let thingsId = that.data.thingsId; 
    console.log(thingsId);
    let acceptId = that.data.acceptId; //本事接受方的ID
    console.log(acceptId);
    let nickName = app.globalData.userInfo.nickName; //用户昵称
    console.log(nickName);
    let status = 0;
    //3、发起请求
    wx.request({
      url: app.globalData.urlPath + '/onBookingAyi.php',
      method: 'POST',
      data: {
        acceptId: acceptId,
        requestId: requestId,
        thingsId: thingsId,
        status: status,
        nickName: nickName
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      success: function(res) {
        //console.log('Request success res.data:' + res.data);
        //console.log('onSkills Query success');
        if (res.statusCode == 200) { //http网络请求，200代表成功
          /**that.setData({
            items: res.data,
          })**/
          wx.showToast({
            title: '预约成功',
            duration: 2000
          })
          wx.switchTab({
            url: '../My/My',
          })
        } else {
          wx.showToast({
            title: '加载数据失败',
            icon: 'none'
          })
        }
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

  //获取所有活动信息
  onGetSkillsDetail: function() {
    let that = this;
    let objectId = that.data.thingsId;
    let currentPage = that.data.currentPage;
    let pageSize = that.data.pageSize;
    //3、发起请求
    wx.request({
      url: app.globalData.urlPath + '/onSkillsDetail.php',
      method: 'POST',
      data: {
        objectId: objectId
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      success: function(res) {
        console.log('Request success res.data:' + res.data);
        console.log('onSkills Query success');
        let itemsTemp = that.data.items;
        if (res.statusCode == 200) { //http网络请求，200代表成功
          if (currentPage == 1) {
            itemsTemp = []
          }
          let items = res.data;
          console.log(items);
          if (items.length < pageSize) {
            that.setData({
              items: itemsTemp.concat(items),
              hasMore: false,
              loadingTip: '没有更多数据'
            })
          } else {
            that.setData({
              items: itemsTemp.concat(items),
              hasMore: true,
              currentPage: that.data.currentPage + 1,
              loadingTip: '上拉加载更多数据'
            })
          }
          wx.showToast({
            title: '查询成功',
            duration: 2000
          })
        } else {
          wx.showToast({
            title: '加载数据失败',
            icon: 'none'
          })
        }
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
    that.onGetSkillsDetail();
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