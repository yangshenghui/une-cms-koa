import { config, LinRouter } from 'lin-mizar';
import { TokenDao } from '../../dao/token';
import { CustomerDao } from '../../dao/customer';
import { TypeDao } from '../../dao/type';
import { VedioDao } from '../../dao/vedio';
import { SwipeDao } from '../../dao/swipe';
import { ReadDao } from '../../dao/read';




const OAuth = require('node-wechat-oauth');

const weixinApi = new LinRouter({
  prefix: '/v1/weixin',
  module: '微信公众号'
});

const tokenDto = new TokenDao();
const customerDto = new CustomerDao();
const typeDto = new TypeDao();
const vedioDto = new VedioDao();
const swipeDto = new SwipeDao();
const readDto = new ReadDao();

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

weixinApi.get('/getTypes', async ctx =>{
  const types = await typeDto.getTypes();
  ctx.json({
    errorCode: 0,
    data: types
  });
  
});

weixinApi.post('/getVedioById', async ctx =>{
  const id = ctx.request.body.id
  const vedio = await vedioDto.getVedioById(id);
  ctx.json({
    errorCode: 0,
    data: vedio
  });
  
});

weixinApi.post('/getVediosByTypeId', async ctx =>{
  const typeId = ctx.request.body.typeId
  const limit = ctx.request.body.limit
  const vedio = await vedioDto.getVediosByTypeId(typeId, limit);
  ctx.json({
    errorCode: 0,
    data: vedio
  });
  
});

weixinApi.get('/getSwipes', async ctx =>{
  const swipes = await swipeDto.getSwipes();
  ctx.json({
    errorCode: 0,
    data: swipes
  });
  
});

weixinApi.get('/getReads', async ctx =>{
  const reads = await readDto.getReads();
  ctx.json({
    errorCode: 0,
    data: reads
  });
});


module.exports = { weixinApi };
