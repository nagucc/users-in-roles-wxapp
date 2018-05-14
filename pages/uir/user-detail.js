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
  onLoad: function ({appId, userId}) {
    uirApi.getUser(appId, userId).then(uir => {

      // 若没找到相应的uir
      if (!uir) {
        const title = '没找到UIR';
        const desc = `appId:${appId}, userId:${userId}`;
        wx.redirectTo({
          url: `/pages/index/error?title=${title}&desc=${desc}`,
        });
      }
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
  
  },

  openActionSheet() {
    const { appId, userId } = this.data;
    wx.showActionSheet({
      itemList: [
        '添加UserId',
        '修改Roles',
      ],
      itemColor: '#000000',
      success: (res) => {
        switch (res.tapIndex) {
          case 0:
            wx.navigateTo({
              url: `/pages/uir/user-edit?appId=${appId}&userId=${userId}`,
            });
            break;
          case 1:
            wx.navigateTo({
              url: `/pages/uir/role-edit?appId=${appId}&userId=${userId}`,
            });
            break;
        }
      },
    })
  },

  deleteUserId() {
    const { appId, userId } = this.data;
    wx.showModal({
      title: '删除确认',
      content: `确定要UserId: ${userId}吗？`,
      success: (res) => {
        if (res.confirm) {
          wx.showLoading({
            title: '数据处理中',
            mask: true,
          });
          uirApi.detachUser(appId, userId).then(result => {
            wx.navigateTo({
              url: `/pages/uir/user-list?appId=${appId}`,
            });
          })
          
        }
      },
    });
  }
})