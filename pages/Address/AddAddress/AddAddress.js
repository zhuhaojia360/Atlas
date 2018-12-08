// pages/Address/AddAddress/AddAddress.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['湖南省', '长沙市', '岳麓区'],
    traitList: [{
      name: "家",
      choose: "false"
    }, {
      name: "公司",
      choose: "false"
    }, {
      name: "学校",
      choose: "false"
    }],
    choseTrait: []

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

  regionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value,
    })
  },

  chooseThingsTrait: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index; //获取自定义的ID值 
    var choseTrait = that.data.choseTrait;
    var traitListNow = that.data.traitList;
    if (that.data.traitList[index].choose == 'false') {
      if (that.data.choseTrait.length > 5) {
        wx.showToast({
          title: '最多只可选五项要求',
          image: '../../images/warn.png',
          duration: 2000
        })
      } else {
        choseTrait.push(that.data.traitList[index].name);
        traitListNow[index].choose = "true";
        this.setData({
          // id: index,
          traitList: traitListNow,
          choseTrait: choseTrait
        })
        console.log(that.data.traitList)
        console.log(that.data.choseTrait)
      }
    } else if (that.data.traitList[index].choose == 'true') {
      traitListNow[index].choose = "false";
      for (var i = 0; i < choseTrait.length; i++) {
        if (choseTrait[i] == traitListNow[index].name) {
          choseTrait.splice(i, 1);
          break;
        }
      }
      this.setData({
        // id: index,
        traitList: traitListNow,
        choseTrait: choseTrait
      })
      console.log(that.data.traitList)
      console.log(that.data.choseTrait)
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