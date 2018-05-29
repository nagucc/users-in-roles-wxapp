const { uirApi, sendVcode } = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    vcode: {
      btnClass: 'weui-vcode-btn',
      btnText: '获取',
      timer: 0,
    },
    submitBtnDisabled: true,
    mobile: '',
    sendedCode: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData(options);
  },

  mobileInput(e) {
    this.setData({
      mobile: e.detail.value,
    });
  },

  submitAdd(e) {
    const { appId, userId, sendedCode } = this.data;

    // 检查验证码是否正确
    if (sendedCode !== e.detail.value.vcode) {
      wx.showModal({
        title: '申请失败',
        content: '验证码不正确',
        showCancel: false,
      });
      return;
    }

    uirApi.apply(appId, userId, e.detail.value).then(result => {
      wx.showModal({
        title: '申请成功',
        content: '您是申请已提交，请耐心等待审核。',
        showCancel: false,
      });
    });
  },

  btnSendVcode (e) {

    // 如果已经有计时器在运行，则退出
    if (this.data.vcode.timer) return;

    // 验证电话号码是否正确
    const { mobile } = this.data;
    if (!mobile.match(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/)) {
      wx.showModal({
        title: '手机号码错误',
        content: '请填写正确的手机号码',
        showCancel: false,
      });
      return;
    }

    // 生成验证码
    const code = [0,0,0,0].reduce((acc, cur) => {
      console.log(Math.floor(Math.random() * 10))
      return acc + Math.floor(Math.random()*10);
    }, '');

    // 保存验证码
    this.setData({
      sendedCode: code,
    });

    // 发送验证码
    sendVcode(mobile, code).then(result => {
      // 发送成功
      wx.showToast({
        title: '发送成功',
      });
    }).catch(err => {
      // 发送失败，可能原因是手机号码不对
      wx.showModal({
        title: '发送验证码失败',
        content: err.errmsg || err.msg,
        showCancel: false,
      });
      this.setData({
        vcode: {
          timer: 0,
        },
      });
    });

    console.log(code);

    // 设置倒计时
    const countDown = timer => {
      const setVcodeView = () => {
        if (timer) {
          this.setData({
            vcode: {
              timer,
              btnText: `重新获取(${timer})`,
              btnClass: 'weui-vcode-btn-disabled',
            }
          });
        } else {
          this.setData({
            vcode: {
              timer,
              btnText: `重新获取`,
              btnClass: 'weui-vcode-btn',
            }
          });
        }
      };

      setVcodeView();
      setTimeout(() => {
        setVcodeView();
        if (timer) countDown(timer -1 );
      }, 1000);
    }
    countDown(60);
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