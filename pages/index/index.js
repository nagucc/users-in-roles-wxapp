const { uirApi, getOpenId, appId, isUirManager } = require('../../utils/util.js');

Page({
  data: {
    isUirManager: false,
    loadingOpenId: true,
  },

  onLoad() {
    // 权限判断
    getOpenId().then(openid => {
      uirApi.getUser(appId, openid).then(uir => {
        if(!isUirManager(uir)) {
          // 非管理员
          this.setData({
            isUirManager: false,
            loadingOpenId: false,
          });
          wx.redirectTo({
            url: `/pages/index/apply?appId=${appId}&userId=${openid}&appName=鉴权平台`,
          });
        } else {
          this.setData({
            isUirManager: true,
            loadingOpenId: false,
          });
        }
      });
    }).catch(e => {
      wx.redirectTo({
        url: '/pages/index/error?title=服务暂时不可用&desc=您访问的信息暂时不可用，请稍后再试',
      });
    });
  },
  toUir: () => {
    wx.navigateTo({
      url: '/pages/uir/app-list',
    });
  },
});
