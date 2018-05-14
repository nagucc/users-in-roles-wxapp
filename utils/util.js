const WexinApi = require('../lib/weixin-api.js');
const UirApi = require('../lib/user-in-role.js');

const appId = 'wx63b32180ec6de471';
const devOptions = {
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.Rq8IxqeX7eA6GgYxlcHdPFVRNFFZc5rEI3MQTZZbK3I',
  // host: 'http://localhost:3000',
  host: 'https://api.nagu.cc/uir/v2',
}
const weixinApi = new WexinApi({
  appId,
  secret: '4c5c33fdb26ab6bb12234f80deb6beea',
});

const uirApi = new UirApi(devOptions)

const getOpenId = () => weixinApi.getOpenId();

// UIR管理员的角色名称，后面加上随机字符，以免与其他系统重复
const UIR_MANAGER = 'uir-manager-ciOiJIUzI1NiIsInR5cCI6Ik';

const isUserInRole = (uir, role) => {
  if (!uir || !uir.roles || !uir.roles.length) return false;
  return uir.roles.some(r => r === role);
}

const isUirManager = (uir) => isUserInRole(uir, UIR_MANAGER);

const showLoading = () => wx.showLoading({
  title: '正在加载',
  mask: true,
});

module.exports = {
  appId,
  weixinApi,
  uirApi,
  getOpenId,
  UIR_MANAGER,
  isUirManager,
  showLoading,
};
