import { config, LinRouter } from 'lin-mizar';
import { TokenDao } from '../../dao/token';
import { CustomerDao } from '../../dao/customer';
import { TypeDao } from '../../dao/type';
import { VedioDao } from '../../dao/vedio';
import { SwipeDao } from '../../dao/swipe';
import { ReadDao } from '../../dao/read';
import { WatchDao } from '../../dao/watch';




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
const watchDto = new WatchDao();

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

weixinApi.post('/getReads', async ctx =>{
  const limit = ctx.request.body.limit
  const reads = await readDto.getReads(limit);
  ctx.json({
    errorCode: 0,
    data: reads
  });
});

weixinApi.post('/getWatchs', async ctx =>{
  const limit = ctx.request.body.limit
  const openid = ctx.request.body.openid
  const watchs = await watchDto.getWatchs(openid, limit);
  ctx.json({
    errorCode: 0,
    data: watchs
  });
});

weixinApi.post('/saveWatchs', async ctx =>{
  const vedioId = ctx.request.body.vedioId
  const gklog = ctx.request.body.gklog
  const openid = ctx.request.body.openid
  const v = {
    openid: openid,
    vedioId: vedioId,
    gklog: gklog
  };
  const watchs = await watchDto.createWatch(v);
  ctx.json({
    errorCode: 0,
    data: watchs
  });
});

weixinApi.post('/getCustomer', async ctx =>{
  const openid = ctx.request.body.openid
  console.log(openid)
  const customer = await customerDto.getCustomer(openid);
  ctx.json({
    errorCode: 0,
    data: customer
  });
});


module.exports = { weixinApi };
