// pages/ThingsDetail/ThingsDetail.js
//获取应用实例
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    objectId: '', //当前活儿ID
    items: [],
    remarks: [],
    pictures: [],
    count: 0,
    hasMore: true,
    isHideLoadMore: true,
    currentPage: 1, //当前页码
    sumPage: 1, //总页码，后台会返回
    pageSize: 5, //每页显示多少条数据
    loadingTip: '上拉加载更多',

    tips: '没有更多数据了，喵~',
    map_width: 380,
    map_height: 180
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //获取当前活儿的objectId
    that.setData({
      objectId: options.objectId
    });
    //获取定位，并把位置标示出来
    app.getLocationInfo(function (locationInfo) {
      console.log('map', locationInfo);
      that.setData({
        longitude: locationInfo.longitude,
        latitude: locationInfo.latitude,
        markers: [{
          id: 0,
          iconPath: "../../images/location/address_gray.png",
          longitude: locationInfo.longitude,
          latitude: locationInfo.latitude,
          width: 30,
          height: 30
        }]
      })
    });

    //set the width and height, 动态设置map的宽和高
    wx.getSystemInfo({
      success: function (res) {
        console.log('getSystemInfo');
        console.log(res.windowWidth);
        that.setData({
          map_width: res.windowWidth,
          map_height: res.windowWidth,
          controls: [{
            id: 1,
            iconPath: '../../images/location/address_red.png',
            position: {
              left: res.windowWidth / 2 - 8,
              top: res.windowWidth / 2 - 16,
              width: 30,
              height: 30
            },
            clickable: true
          }]
        })
      }
    });
  },

  //获取中间点的经纬度，并mark出来
  getLngLat: function () {
    var that = this;
    this.mapCtx = wx.createMapContext("map4select");
    this.mapCtx.getCenterLocation({
      success: function (res) {
        that.setData({
          longitude: res.longitude,
          latitude: res.latitude,
          markers: [{
            id: 0,
            iconPath: "../../images/location/address_red.png",
            longitude: res.longitude,
            latitude: res.latitude,
            width: 30,
            height: 30
          }]
        })
      }
    })
  },

  regionchange(e) {
    //地图发生变化的时候，获取中间点，也就是用户选择的位置
    if (e.type == 'end') {
      this.getLngLat()
    }
  },

  markertap(e) {
    console.log(e)
  },

  //获取所有活动信息
  onGetThingsDetail: function () {
    let that = this;
    let objectId = that.data.objectId;
    let currentPage = that.data.currentPage;
    let pageSize = that.data.pageSize;
    //3、发起请求
    wx.request({
      url: app.globalData.urlPath + '/onThingsDetail.php',
      method: 'POST',
      data: {
        objectId: objectId
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      success: function (res) {
        console.log('Request success res.data:' + res.data);
        console.log('onThings Query success');
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

  onBooking: function (e) {
    var id = e.currentTarget.dataset.id; //打印可以看到，此处已获取到了对应的id
    wx.navigateTo({
      url: '../ReleaseThings/ReleaseThings?objectId=' + id
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
    that.onGetThingsDetail();
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