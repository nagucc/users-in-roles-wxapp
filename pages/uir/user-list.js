const { uirApi, showLoading } = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    users: [],
    totalCount: 0,
    appId: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { appId } = options;
    showLoading();
    uirApi.usersByAppId(appId).then(users => {
      wx.hideLoading();
      this.setData({
        appId,
        users: users.map(doc => doc.user[appId]),
        totalCount: users.length,
      });
    });
  },

  addUser() {
    wx.navigateTo({
    url: '/pages/uir/user-edit',
    });
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