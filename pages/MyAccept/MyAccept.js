// pages/Skills/Skills.js

//获取应用实例
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    items: [],
    count: 0,
    hasMore: true,
    isHideLoadMore: true,
    currentPage: 1, //当前页码
    sumPage: 1, //总页码，后台会返回
    pageSize: 5, //每页显示多少条数据
    loadingTip: '上拉加载更多',
  },

  //获取所有活动信息
  onGetAccept: function () {
    let that = this;
    let acceptId = app.globalData.objectId;
    let currentPage = that.data.currentPage;
    let pageSize = that.data.pageSize;
    //3、发起请求
    wx.request({
      url: app.globalData.urlPath + '/onGetAccept.php',
      method: 'POST',
      data: {
        acceptId:acceptId
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      success: function (res) {
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
      fail: function (res) {
        wx.showModal({
          title: '提示',
          content: '查询失败'
        })
      },
      complete: function (res) {
        console.log(res)
      }
    })
  },

  //点击单个活动跳转事件，跳转到活动详情
  onDetail: function (e) {
    let thingsId = e.currentTarget.dataset.id;
    let acceptId = e.currentTarget.dataset.index;
    console.log('objectId:' + thingsId + ',account:' + acceptId)
    wx.navigateTo({
      url: '../SkillsDetail/SkillsDetail?thingsId=' + thingsId + '&acceptId=' + acceptId
    })
  },

  onPhoneCall: function (event) {
    wx.makePhoneCall({
      phoneNumber: '18670011098',
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
    var that = this;
    that.onGetAccept();
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
    var that = this;
    wx.showNavigationBarLoading(); //在标题栏中显示加载            
    setTimeout(function () {
      // complete 
      that.onGetAccept();
      wx.hideNavigationBarLoading(); //完成停止加载
      wx.stopPullDownRefresh(); //停止下拉刷新      
    }, 1500);
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