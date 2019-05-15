const { uirApi } = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '正在加载',
      mask: true,
    });
    uirApi.applyList().then(list => {
      console.log(list);
      wx.hideLoading();
      this.setData({
        list,
      });
    }).catch(err => {
      wx.hideLoading();
      wx.showModal({
        title: '错误',
        content: '获取数据失败',
        showCancel: false,
      });
    });
  },

  // “拒绝”按钮
  denyApply(e) {

    
    const { appid, userid, name } = e.target.dataset;

    wx.showModal({
      title: '确认',
      content: `确定要拒绝${name}的权限申请吗？`,
      showCancel: true,
      success: function (res) {
        console.log(res);

        // 用户“取消”操作
        if (res.cancel) return;

        // 用户”确认“操作
        wx.showLoading({
          title: '正在加载',
          mask: true,
        });
        uirApi.removeApply(appid, userid).then(result => {
          wx.hideLoading();

          // 更新列表
          this.setData({
            list: this.data.list.filter(apply => apply.appId !== appid && apply.userId !== userid),
          });
        }).catch(err => {
          console.log(err);
          wx.hideLoading();
        });
      },
    });

    
  },

  // “同意”按钮
  approve(e) {
    // 检查当前appId和userId是否已在uir表中；
    wx.showLoading({
      title: '正在检查用户',
      mask: true,
    });
    const { appid, userid, name } = e.target.dataset;    
    uirApi.getUser(appid, userid).then(uir => {
      let promiseUserExist = null;
      console.log('uir1:', uir);
      if (uir) {
        promiseUserExist = Promise.resolve(uir);
      } else {
        // 若不在，则创建新的
        promiseUserExist = uirApi.addUser(appid, userid);
      }
      promiseUserExist.then(uir => {
        console.log('uir2:', uir);
        // 删除申请信息
        wx.showLoading({
          title: '正在清除申请信息',
          mask: true,
        });
        uirApi.removeApply(appid, userid).then(result => {
          wx.hideLoading();

          // 跳转到添加角色的页面
          wx.navigateTo({
            url: `/pages/uir/role-edit?appId=${appid}&userId=${userid}`,
          });
        }).catch(err => {
          wx.hideLoading();
          wx.showModal({
            title: '服务器错误',
            content: `请于管理员联系：${JSON.stringify(err)}`,
          });
        });
        
      }).catch(err => {
        wx.showModal({
          title: '服务器错误',
          content: JSON.stringify(err),
          showCancel: true,
        });
      })
    }).catch(err => {
      console.log(err);
    });
  }
})