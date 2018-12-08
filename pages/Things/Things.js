// pages/Things/Things.js

//获取应用实例
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    shownavindex: 1,
    location: '长沙',
    sort: '推荐',
    filter:'要求',

    sortOpen: false,
    sortShow: false,
    filterOpen: false,
    filterShow: false,

    content:'',
    service:[],

    items: [],
    count: 0,
    hasMore:true,
    isHideLoadMore: true,
    currentPage: 1, //当前页码
    sumPage: 1, //总页码，后台会返回
    pageSize: 5, //每页显示多少条数据
    loadingTip: '上拉加载更多',
    tips:'暂无更多数据'
  },

  onLocation: function () {
    wx.showToast({
      title: '更多地区待开通中...',
      icon: 'none',
      duration: 3000
    })
  },

  onSort: function (e) {
    if (this.data.sortOpen) {
      this.setData({
        sortOpen: false,
        filterOpen: false,
        sortShow: false,
        filterShow: true,
        isfull: false,
        shownavindex: 0
      })
    } else {
      this.setData({
        content: this.data.service,
        sortOpen: true,
        filterOpen: false,
        sortShow: false,
        filterShow: false,
        isfull: true,
        shownavindex: e.currentTarget.dataset.nav
      })
    }
  },

  onFilter: function (e) {
    if (this.data.filterOpen) {
      this.setData({
        sortOpen: false,
        filterOpen: false,
        sortShow: true,
        filterShow: false,
        isfull: false,
        shownavindex: 0
      })
    } else {
      this.setData({
        content: this.data.filter,
        sortOpen: false,
        filterOpen: true,
        sortShow: true,
        filterShow: false,
        isfull: true,
        shownavindex: e.currentTarget.dataset.nav
      })
    }
    console.log(e.target)
  },

  selectService: function (e) {
    this.setData({
      sortOpen: false,
      filterOpen: false,
      sortShow: false,
      filterShow: true,
      isfull: false,
      chooseService: e.currentTarget.dataset.service,
      page_index: 0,
      technician_list: [],
      has_more: true
    });
    that.filterService();
  },

  selectFilter: function (e) {
    this.setData({
      sortOpen: false,
      filterOpen: false,
      sortShow: true,
      filterShow: false,
      isfull: false,
      chooseFilter: e.currentTarget.dataset.filter,
      page_index: 0,
      technician_list: [],
      has_more: true
    });
    that.filterService();
  },

  hidebg: function (e) {
    this.setData({
      sortOpen: false,
      filterOpen: false,
      sortShow: true,
      filterShow: true,
      isfull: false,
      shownavindex: 0
    })
  },

  //获取所有活动信息
  onGetThings: function() {
    let that = this;
    let currentPage = that.data.currentPage;
    let pageSize = that.data.pageSize;
    //3、发起请求
    wx.request({
      url: app.globalData.urlPath + '/onThings.php',
      method: 'POST',
      data: {
        
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      success: function(res) {
        console.log('Request success res.data:' + res.data);
        //console.log('onThings Query success');
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

  //点击单个活动跳转事件，跳转到活动详情
  onDetail: function(e) {
    var id = e.currentTarget.dataset.id; //打印可以看到，此处已获取到了对应的id
    wx.navigateTo({
      url: '../ThingsDetail/ThingsDetail?objectId=' + id
      //url: '../ReleaseThings/ReleaseThings?objectId=' + id
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    var that = this;
    that.onGetThings();
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
    var that = this;
    wx.showNavigationBarLoading(); //在标题栏中显示加载            
    setTimeout(function() {
      // complete 
      that.onGetThings();
      wx.hideNavigationBarLoading(); //完成停止加载
      wx.stopPullDownRefresh(); //停止下拉刷新      
    }, 1500);
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