// pages/ReleaseSkills/ReleaseSkills.js
var util = require('../../utils/util.js');
//获取应用实例
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    skillsArray: ['日常保洁', '新房开荒', '高级保姆', '金牌月嫂', '管道疏通', '家电清洗'],
    skillsEnglish: ['CLEANUP', 'SWEEPUP', 'NANNY', 'BABYSITTER', 'DREDGE', 'APPLIANCE'],
    skillsIndex: 0,
    skills: '日常保洁',

    name: '',
    inputName: null,
    tipsName: '您的称呼，如“李女士”',
    telephone: null,
    inputTelephone: null,
    tipsTelephone: '您的电话',
    region: ['湖南省', '长沙市', '岳麓区'],
    village: null,
    inputVillage: null,
    tipsVillage: '所在小区，例如:“左邻右舍”',
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
    tipsRemark: '请填写其他个性化介绍',
    price: '40元每小时每人，4小时起',

    chooseSkillsTrait: '',
    skillsTraitList: [],

    traitList: [{
      name: "日常保洁",
      choose: "false"
    }, {
      name: "新房开荒",
      choose: "false"
    }, {
      name: "擦玻璃",
      choose: "false"
    }, {
      name: "月嫂",
      choose: "false"
    }, {
      name: "保姆",
      choose: "false"
    }, {
      name: "带小孩睡",
      choose: "false"
    }, {
      name: "管道疏通",
      choose: "false"
    }, {
      name: "家电清洗",
      choose: "false"
    }, {
      name: "消毒",
      choose: "false"
    }, {
      name: "除螨",
      choose: "false"
    }],
    choseTrait: [],

    toolsList: [{
      name: "自带工具",
      choose: "false"
    }, {
        name: "清洁剂",
        choose: "false"
      }, {
      name: "健康证",
      choose: "false"
    }, {
      name: "上岗证",
      choose: "false"
    }, {
      name: "月嫂证",
      choose: "false"
    }, {
      name: "意外险",
      choose: "false"
    }, {
      name: "少说多做",
      choose: "false"
    }, {
      name: "随叫随到",
      choose: "false"
    }, {
      name: "从业两年以上",
      choose: "false"
    }],
    choseTools: []
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

  skillsChange: function(e) {
    var that = this;
    console.log('picker发送选择改变，携带值为', e.detail.value)
    that.setData({
      skillsIndex: e.detail.value,
      skills: that.data.skillsArray[e.detail.value]
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

  chooseSkillsTrait: function(e) {
    var that = this;
    var index = e.currentTarget.dataset.index; //获取自定义的ID值 
    var choseTrait = that.data.choseTrait;
    var traitListNow = that.data.traitList;
    if (that.data.traitList[index].choose == 'false') {
      if (that.data.choseTrait.length > 4) {
        wx.showToast({
          title: '最多只可选5项',
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

  chooseTools: function(e) {
    var that = this;
    var index = e.currentTarget.dataset.index; //获取自定义的ID值 
    var choseTools = that.data.choseTools;
    var toolsListNow = that.data.toolsList;
    if (that.data.toolsList[index].choose == 'false') {
      if (that.data.choseTools.length > 4) {
        wx.showToast({
          title: '最多只可选5项',
          image: '../../images/warn.png',
          duration: 2000
        })
      } else {
        choseTools.push(that.data.toolsList[index].name);
        toolsListNow[index].choose = "true";
        this.setData({
          // id: index,
          toolsList: toolsListNow,
          choseTools: choseTools
        })
        console.log(that.data.toolsList)
        console.log(that.data.choseTools)
      }
    } else if (that.data.toolsList[index].choose == 'true') {
      toolsListNow[index].choose = "false";
      for (var i = 0; i < choseTools.length; i++) {
        if (choseTools[i] == toolsListNow[index].name) {
          choseTools.splice(i, 1);
          break;
        }
      }
      this.setData({
        // id: index,
        toolsList: toolsListNow,
        choseTools: choseTools
      })
      console.log(that.data.toolsList)
      console.log(that.data.choseTools)
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
          let objectId = app.globalData.objectId;
          let name = that.data.name; //用户称呼
          let telephone = that.data.telephone; //联系电话
          //let skills = that.data.skills; //服务类型
          //let date = that.data.date; //日期
          //let time = that.data.time; //时间
          let region = that.data.region; //区域
          let province = that.data.region[0]; //省
          let city = that.data.region[1]; //市
          let district = that.data.region[2]; //区
          let village = that.data.village; //小区
          //let address = that.data.address; //详细地址
          let choseTrait = that.data.choseTrait; //专业本事
          let traitOne = that.data.choseTrait[0];
          let traitTwo = that.data.choseTrait[1];
          let traitThree = that.data.choseTrait[2];
          let traitFour = that.data.choseTrait[3];
          let traitFive = that.data.choseTrait[4];
          let choseTools = that.data.choseTools; //具备工具
          let toolOne = that.data.choseTools[0];
          let toolTwo = that.data.choseTools[1];
          let toolThree = that.data.choseTools[2];
          let toolFour = that.data.choseTools[3];
          let toolFive = that.data.choseTools[4];
          let remark = that.data.remark; //备注说明

          //用户补充信息
          //let account = app.globalData.userInfo.account; //账户
          //let account = that.data.telephone;
          let nickName = app.globalData.userInfo.nickName; //用户昵称
          //let avataUrl = app.globalData.userInfo.avataUrl; //用户头像地址
          //let gender = app.globalData.userInfo.gender; //用户性别
          //let city = app.globalData.userInfo.city; //用户所在城市

          //3、发起请求
          wx.request({
            url: app.globalData.urlPath + '/onReleaseSkills.php',
            method: 'POST',
            data: {
              objectId:objectId,
              //account: account,
              name: name,
              telephone: telephone,
              //skills: skills,
              //date: date,
              //time: time,
              region: region,
              province: province,
              city: city,
              district: district,
              village: village,
              //address: address,
              choseTrait: choseTrait,
              traitOne: traitOne,
              traitTwo: traitTwo,
              traitThree: traitThree,
              traitFour: traitFour,
              traitFive: traitFive,
              choseTools: choseTools,
              toolOne: toolOne,
              toolTwo: toolTwo,
              toolThree: toolThree,
              toolFour: toolFour,
              toolFive: toolFive,
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
                  url: '../Skills/Skills'
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
    if (!app.globalData.isLogin) {
      wx.navigateTo({
        url: '../Auth/Auth',
      })
    }
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