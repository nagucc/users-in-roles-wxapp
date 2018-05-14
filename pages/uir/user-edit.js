const { uirApi } = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function ({ appId, userId }) {
    // 不传入参数时，新建用户
    if (!appId || !userId) return;
    uirApi.getUser(appId, userId).then(uir => {
      if (!uir) return;
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
    const newUser = e.detail.value;
    const attachTo = this.data;

    let result;
    // 附加到用户
    if (attachTo.appId && attachTo.userId){
      result = uirApi.attachUser(attachTo, newUser);
    } else { // 新建
      result = uirApi.addUser(newUser.appId, newUser.userId);
    }
    result.then(result => {
      wx.navigateTo({
        url: `/pages/uir/user-detail?appId=${newUser.appId}&userId=${newUser.userId}`,
      });
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