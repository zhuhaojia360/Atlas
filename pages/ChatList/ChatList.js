const app = getApp()
import {  formatTime } from '../../utils/util'
import socket from '../../utils/socket'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    tips: '正在载入聊天列表，请稍候...',
    list: []
  },

  /**跳转聊天详情 */
  goPage: function(e) {
    let newlist = this.data.list
    const index = e.currentTarget.dataset.index
    let name = e.currentTarget.dataset.name
    let id = e.currentTarget.dataset.id
    newlist[index].count = 0
    this.setData({
      list: newlist
    })
    wx.navigateTo({
      url: '../ChatInput/ChatInput?name=' + name + "&id=" + id
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    socket.onMessage((data) => {
      console.log(data)
      if (data.cmd != "CMD" || data.subCmd != 'ROOMS')
        return
      data.rooms.forEach((room) => {
        room.updated = formatTime(room.updated)
      })
      if (data.cmd == 'CMD' && data.subCmd == 'ROOMS') {
        this.setData({
          list: data.rooms
        })
      }
    })
    setTimeout(() => {
      socket.sendMessage({
        cmd: 'ROOMS'
      })
    }, 2000)

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