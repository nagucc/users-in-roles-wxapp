const { uirApi } = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectedIndex: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function ({ appId, userId }) {
    uirApi.getUser(appId, userId).then(uir => {
      const ids = Object.entries(uir.user).reduce((acc, cur) => {
        acc.push({
          appId: cur[0],
          userId: cur[1],
        });
        return acc;
      }, []);
      this.setData({
        uir,
        ids,
        roles: uir.roles,
        userId,
        appId,
      });
    });
  },

  submitAdd: function(e) {
    const { role } = e.detail.value;
    const { appId, userId } = this.data;
    uirApi.addRole(appId, userId, role).then(result => {
      wx.navigateTo({
        url: `/pages/uir/user-detail?appId=${appId}&userId=${userId}`,
      });
    });
  },

  bindRoleForDeleteChange: function(e) {
    this.setData({
      selectedIndex: parseInt(e.detail.value, 10),
    });
  },

  submitDelete: function(e) {
    const { roles, selectedIndex, appId, userId } = this.data;
    const role = roles[selectedIndex];
    wx.showModal({
      title: '确认删除',
      content: `确认要删除角色【${role}】吗？`,
      showCancel: true,
      success: function(res) {
        if (res.confirm) {
          uirApi.removeRole(appId, userId, role).then(result => {
            wx.navigateTo({
              url: `/pages/uir/user-detail?appId=${appId}&userId=${userId}`,
            });
          });
        }
      },
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