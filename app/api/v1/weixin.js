import { config, LinRouter } from 'lin-mizar';
import { TokenDao } from '../../dao/token';
import { CustomerDao } from '../../dao/customer';


const OAuth = require('node-wechat-oauth');

const weixinApi = new LinRouter({
  prefix: '/v1/weixin',
  module: '微信公众号'
});

const tokenDto = new TokenDao();
const customerDto = new CustomerDao();

const oauth = new OAuth(config.getItem('wx.appid', ''), config.getItem('wx.secret', ''));
oauth.saveToken = (async(openid, token) => {
  console.log('saveToken');
  console.log(token)
  await tokenDto.createToken(token);
});

oauth.getToken = (async(openid) => {
  console.log('getToken');
  const token = await tokenDto.getToken(openid);
  //console.log(token.dataValues)
  return token.dataValues;
});

weixinApi.post('/oauthUrl', async ctx => {
  const authUrl = oauth.getAuthorizeURL(ctx.request.body.oauthUrl, null, 'snsapi_userinfo');
  //console.log(authUrl);
  ctx.json({
    errorCode: 0,
    data: authUrl});
});

weixinApi.post('/weChatOAuth', async ctx => {
  const result = await oauth.getAccessToken(ctx.request.body.code);
  //console.log(result)
  const openid = result.data.openid;
  const userinfo = await oauth.getUser(openid);
  //console.log(userinfo)
  await customerDto.createCustomer(userinfo);

  ctx.json({
    errorCode: 0,
    data: {
      openid: openid,
      nickname: userinfo.nickname
    }});
});


module.exports = { weixinApi };
