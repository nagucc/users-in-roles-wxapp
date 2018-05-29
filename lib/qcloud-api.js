/*
version: v0.1.0
提供腾讯云相关API
*/
class QcApi {
  constructor(options = {}) {
    this.host = options.host;
    this.token = options.token;
  }

  sendSingleSms(options) {
    const { mobile, nationcode, params, tplId, sign, ext, extend } = options;
    return new Promise((resolve, reject) =>  {
      wx.request({
        url: `${this.host}/sms/send/single?token=${this.token}`,
        data: {
          tel: {
            nationcode: nationcode || 86,
            mobile,
          },
          tplId,
          params,
          sign,
          ext,
          extend,
        },
        method: 'PUT',
        success: function (res) {
          if (res.data.ret === 0) {
            const qcres = res.data.data;
            if (qcres.result === 0) resolve(res.data.data);
            else reject(qcres);
          }
          else reject(res.data);
        },
      });
    });
    
  }
}

module.exports = QcApi;

