// pages/Things/Things.js

var util = require('../../utils/util.js');

//获取应用实例
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    objectId: '', //当前活儿ID
    items: [],
    serviceArray: ['日常保洁', '新房开荒', '高级保姆', '金牌月嫂', '管道疏通', '家电清洗'],
    serviceEnglish: ['CLEANUP', 'SWEEPUP', 'NANNY', 'BABYSITTER', 'DREDGE', 'APPLIANCE'],
    index: 0,
    service: '日常保洁',

    begindate: '2018-09-09',
    enddate: '2018-10-09',
    date: '2018-09-09',
    time: '12:00',

    shownavindex: 1,
    location: '长沙',
    sort: '推荐',
    filter:'要求',

    sortOpen: false,
    sortShow: false,
    filterOpen: false,
    filterShow: false,

    //banner初始化
    //banner_url: fileData.getBannerData(),
    //banner_url: ['../../images/banner/banner_01.png', '../../images/banner/banner_02.png', '../../images/banner/banner_03.png', '../../images/banner/banner_04.png'],
    banner_url: ['https://lg-aexije2w-1256961708.cos.ap-shanghai.myqcloud.com/banner_01.png', 'https://lg-aexije2w-1256961708.cos.ap-shanghai.myqcloud.com/banner_02.png', 'https://lg-aexije2w-1256961708.cos.ap-shanghai.myqcloud.com/banner_03.png','https://lg-aexije2w-1256961708.cos.ap-shanghai.myqcloud.com/banner_04.png'],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 3000,
    duration: 1000,

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
    //获取系统当前时间年月日
    var date = new Date();
    var begindate = util.formatTime2(date);
    var enddate = util.formatTime3(date);
    //获取一年后的时间
    //var endtime = util.formatTime3(date);
    this.setData({
      date: begindate,
      begindate: begindate,
      enddate: enddate
    });
    console.log('date:' + date + ' begindate:' + begindate + ' enddate:' + enddate)
  },

  serviceChange: function (e) {
    var that = this;
    console.log('picker发送选择改变，携带值为', e.detail.value)
    that.setData({
      index: e.detail.value
      //service: that.data.serviceArray[e.detail.value]
    })
  },

  dateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },

  timeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },

  bookingServ: function (e) {
    var date = e.currentTarget.dataset.date;
    var time = e.currentTarget.dataset.time;
    //var region = e.currentTarget.dataset.region;
    var index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '../ReleaseThings/ReleaseThings?date=' + date + '&time=' + time + '&index=' + index
    })
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