import { config, LinRouter } from 'lin-mizar';
import { TokenDao } from '../../dao/token';
import { CustomerDao } from '../../dao/customer';
import { TypeDao } from '../../dao/type';
import { VedioDao } from '../../dao/vedio';
import { SwipeDao } from '../../dao/swipe';
import { ReadDao } from '../../dao/read';
import { WatchDao } from '../../dao/watch';
import { QiniuDownload } from '../../extension/file/qiniu-download';



const path = require('path');
const fs = require('fs');


const OAuth = require('node-wechat-oauth');
const weixinJsConfig = require('weixin-node-jssdk');
const wxPayment = require('wx-payment');

const baseDir = path.resolve(__dirname, '../../../');

wxPayment.init({
  appid: config.getItem('wx.appid', ''),
  mch_id: config.getItem('wx.mch_id', ''),
  apiKey: config.getItem('wx.api_key', ''), //微信商户平台API密钥
  pfx: fs.readFileSync(path.resolve(`${baseDir}/apiclient_cert.p12`)), //微信商户平台证书 (optional，部分API需要使用)
});

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
  await tokenDto.createToken(token);
});

oauth.getToken = (async(openid) => {
  const token = await tokenDto.getToken(openid);
  return token.dataValues;
});

weixinApi.post('/oauthUrl', async ctx => {
  const authUrl = oauth.getAuthorizeURL(ctx.request.body.oauthUrl, null, 'snsapi_userinfo');
  ctx.json({
    errorCode: 0,
    data: authUrl});
});


weixinApi.post('/getSignature', async ctx => {
  const options = {};
  options.appId = config.getItem('wx.appid', '');
  options.appSecret = config.getItem('wx.secret', '');
  options.url = ctx.request.body.oauthUrl;
  
  const promise = new Promise((resolve, reject)=>{
    weixinJsConfig(options,function(error,ret){
      if(error != null) {
        reject(error)
      } else {
        resolve(ret) 
      }
    });
  });
  await promise.then((data)=>{
    console.log(data)
    ctx.json({
      errorCode: 0,
      data: data
    });
  },(error)=>{
    // 获取数据失败时
    console.log(error)
  })
  
});

weixinApi.post('/createUnifiedOrder', async ctx => {
  const openid = ctx.request.body.openid;
  const promise = new Promise((resolve, reject)=>{
    wxPayment.createUnifiedOrder({
      body: '支付测试', // 商品或支付单简要描述
      out_trade_no: '41412412454141dffsd', // 商户系统内部的订单号,32个字符内、可包含字母
      total_fee: 100,
      spbill_create_ip: '47.242.245.39',
      notify_url: 'http://wx.unechannel.com:5000/v1/weixin/notify',
      trade_type: 'JSAPI',
      product_id: '1234567890',
      openid: openid
    }, function(err, result){
      if(err != null) {
        reject(err)
      } else {
        resolve(result) 
      }
    });
  });

  await promise.then((data)=>{
    console.log(data)

    var ret = {
      appId: data.appid,
      timeStamp: parseInt(new Date().getTime() / 1000),
      nonceStr: Math.random().toString(36).substr(2, 15),
      package: `prepay_id=${data.prepay_id}`,  
      signType: 'MD5'
    };
    
    console.log('retretret==', ret);
    var keys = Object.keys(ret);
    keys = keys.sort()
    var newArgs = {};
    keys.forEach(function (key) {
        newArgs[key] = ret[key];
    });
    var string = '';
    for (var k in newArgs) {
        string += '&' + k + '=' + newArgs[k];
    }
    string = string.substr(1);
    string = string + '&key=' + config.getItem('wx.api_key', '');
    console.log('stringstringstring=', string);
    var crypto = require('crypto');
    const paySign = crypto.createHash('md5').update(string, 'utf8').digest('hex').toUpperCase();
    ret.paySign = paySign;
    ret.prepay_id = data.prepay_id
    ctx.json({
      errorCode: 0,
      data: ret
    });
  },(error)=>{
    // 获取数据失败时
    console.log(error)
  })
  
});

weixinApi.post('/notify', async ctx => {
  console.log(ctx)
});

weixinApi.post('/weChatOAuth', async ctx => {
  const result = await oauth.getAccessToken(ctx.request.body.code);
  const openid = result.data.openid;
  const userinfo = await oauth.getUser(openid);
  await customerDto.createCustomer(userinfo);
  ctx.json({
    errorCode: 0,
    data: {
      openid: openid,
      nickname: userinfo.nickname
    }});
});

weixinApi.post('/weChatOAuth', async ctx => {
  const result = await oauth.getAccessToken(ctx.request.body.code);
  const openid = result.data.openid;
  const userinfo = await oauth.getUser(openid);
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

weixinApi.post('/downloadPdf', async ctx =>{
  const download = new QiniuDownload();
  const src = await download.download();
  ctx.json({
    errorCode: 0,
    data: src
  });
  
});


module.exports = { weixinApi };
