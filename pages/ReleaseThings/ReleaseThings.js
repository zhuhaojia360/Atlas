// pages/ReleaseThings/ReleaseThings.js
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
    serviceIndex: 0,
    service: '日常保洁',

    name: '',
    inputName: null,
    tipsName: '您的称呼，如“李女士”',
    tipsArea:'建筑面积',
    telephone: null,
    inputTelephone: null,
    tipsTelephone: '您的电话',
    region: ['湖南省', '长沙市', '岳麓区'],
    village: null,
    inputVillage: null,
    tipsVillage: '例如:“左邻右舍”',
    address: null,
    inputAddress: null,
    tipsAddress: '几期/栋/单元/房号',
    latitude: '',
    longitude: '',

    begindate: '2018-09-09',
    enddate: '2018-10-09',
    date: '2018-09-09',
    time: '12:00',
    area: null,
    inputArea: null,
    remark: null,
    inputRemark: null,
    tipsRemark: '请填写其他个性化要求',
    price: '40元每小时每人，4小时起',

    chooseThingsTrait: '',
    thingsTraitList: [],

    traitList: [{
      name: "擦玻璃",
      choose: "false"
    }, {
      name: "油烟机表面",
      choose: "false"
    }, {
      name: "高温消毒",
      choose: "false"
    }, {
      name: "除螨",
      choose: "false"
    }, {
      name: "叠衣服",
      choose: "false"
    }, {
      name: "冰箱清洁",
      choose: "false"
    }, {
      name: "做饭菜",
      choose: "false"
    }, {
      name: "带小孩睡",
      choose: "false"
    }],
    choseTrait: []

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

  inputNameRight: function(e) {
    if (!e.detail.value) {
      this.setData({
        inputName: false
      })
    } else {
      this.setData({
        name: e.detail.value,
        inputName: true
      })
    }
  },

  inputTelephoneRight: function(e) {
    if (!e.detail.value) {
      this.setData({
        inputTelephone: false
      })
    } else {
      this.setData({
        telephone: e.detail.value,
        inputTelephone: true
      })
    }
  },

  inputVillageRight: function(e) {
    if (!e.detail.value) {
      this.setData({
        inputVillage: false
      })
    } else {
      this.setData({
        village: e.detail.value,
        inputVillage: true
      })
    }
  },

  serviceChange: function(e) {
    var that = this;
    console.log('picker发送选择改变，携带值为', e.detail.value)
    that.setData({
      serviceIndex: e.detail.value,
      service: that.data.serviceArray[e.detail.value]
    })
  },

  dateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },

  timeChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },

  regionChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value,
    })
  },

  inputAddressRight: function(e) {
    if (!e.detail.value) {
      this.setData({
        inputAddress: false
      })
    } else {
      this.setData({
        address: e.detail.value,
        inputAddress: true
      })
    }
  },

  chooseThingsTrait: function(e) {
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

  inputRemarkRight: function(e) {
    if (!e.detail.value) {
      this.setData({
        inputRemark: false
      })
    } else {
      this.setData({
        remark: e.detail.value,
        inputRemark: true
      })
    }
  },

  releaseSuccess: function() {
    let that = this;
    let myreg = /^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$$/; //正则表达式检验电话号码
    //输入不为空
    if (that.data.name != '' && that.data.telephone != '' && that.data.village != '') {
      if (that.data.telephone.length == 11 && myreg.test(that.data.telephone)) {
        if (app.globalData.isLogin) {
          //客户提交信息
          let name = that.data.name; //用户称呼
          let telephone = that.data.telephone; //联系电话
          let service = that.data.service; //服务类型
          let date = that.data.date; //日期
          let time = that.data.time; //时间
          let region = that.data.region; //区域
          let province = that.data.region[0]; //省
          let city = that.data.region[1]; //市
          let district = that.data.region[2]; //区
          let village = that.data.village; //小区
          let address = that.data.address; //详细地址
          let choseTrait = that.data.choseTrait; //个性化要求
          let remark = that.data.remark; //备注说明

          //用户补充信息
          //let account = app.globalData.userInfo.account; //账户
          let account = app.globalData.objectId;
          let nickName = app.globalData.userInfo.nickName; //用户昵称
          //let avataUrl = app.globalData.userInfo.avataUrl; //用户头像地址
          //let gender = app.globalData.userInfo.gender; //用户性别
          //let city = app.globalData.userInfo.city; //用户所在城市

          //3、发起请求
          wx.request({
            url: app.globalData.urlPath + '/onReleaseThings.php',
            method: 'POST',
            data: {
              account: account,
              name: name,
              telephone: telephone,
              service: service,
              date: date,
              time: time,
              region: region,
              province: province,
              city: city,
              district: district,
              village: village,
              address: address,
              choseTrait: choseTrait,
              remark: remark,
              nickName: nickName
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded',
              //'Accept': 'application/json'
            },
            success: function(res) {
              if (res.data.statusCode == 200) {
                console.log('Request success res.data:' + res.data);
              }
              wx.showToast({
                title: '发布成功',
                duration: 2000
              })
              setTimeout(function() {
                wx.switchTab({
                  url: '../Things/Things'
                })
              }, 2000);
            },
            fail: function(res) {
              wx.showModal({
                title: '提示',
                content: '发布失败'
              })
            },
            complete: function(res) {
              console.log(res)
            }
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '请先登录再发布'
          })
        }
      } else {
        wx.showModal({
          title: '提示',
          content: '手机号码格式不正确'
        })
      }
    } else {
      wx.showModal({
        title: '提示',
        content: '请把资料填写完整'
      })
    }
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
    if (!app.globalData.isLogin) {
      wx.navigateTo({
        url: '../Auth/Auth',
      })
    }
    that.setData({
      name: app.globalData.userInfo.nickName
    })

    /**wx.checkSession({
      success: function (res) {
        console.log('处于登陆状态')
        return;
      },
      fail: function (res) {
        console.log('需要重新登陆')
        wx.navigateTo({
          url: '../Login/Login',
        })
      }
    })**/
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