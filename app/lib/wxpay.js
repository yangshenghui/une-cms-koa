
var request = require('request');
var xmlreader = require("xmlreader");
var fs = require("fs");
  
var wxutil = require('./wxutil');
 
 
var appid     = 'wx28f86efd25cc3312';
var appsecret = 'b8687555bf947b1947b62767c448723';
var mchid     = '1499403456'
var mchkey    = '8r435jVd7yA0354nsvkxb4cN3x7Se4322';
var wxurl     = 'http://XXXXXXXXX/weixinNotify.action'

var wxpay = { 
    createUnifiedOrder: function (orderCode, money, orderID) {
    
        console.log('APP传过来的参数是',orderCode+'----'+money+'------'+orderID+'----'+appid+'-----'+appsecret+'-----'+mchid+'-----'+mchkey);
    
        //首先生成签名sign
        appid
        let mch_id = mchid;
        let nonce_str = wxutil.createNonceStr();
        let timestamp = wxutil.createTimeStamp();
        let body = '测试微信支付';
        let out_trade_no = orderCode;
        let total_fee = wxutil.getmoney(money);
        let spbill_create_ip = req.connection.remoteAddress;
        let notify_url = wxurl;
        let trade_type = 'APP';
    
        let sign = wxutil.paysignjsapi(appid,body,mch_id,nonce_str,notify_url,out_trade_no,spbill_create_ip,total_fee,trade_type,mchkey);
    
        console.log('sign==',sign);
    
        //组装xml数据
        var formData  = "<xml>";
        formData  += "<appid>"+appid+"</appid>";  //appid
        formData  += "<body><![CDATA["+"测试微信支付"+"]]></body>";
        formData  += "<mch_id>"+mch_id+"</mch_id>";  //商户号
        formData  += "<nonce_str>"+nonce_str+"</nonce_str>"; //随机字符串，不长于32位。
        formData  += "<notify_url>"+notify_url+"</notify_url>";
        formData  += "<out_trade_no>"+out_trade_no+"</out_trade_no>";
        formData  += "<spbill_create_ip>"+spbill_create_ip+"</spbill_create_ip>";
        formData  += "<total_fee>"+total_fee+"</total_fee>";
        formData  += "<trade_type>"+trade_type+"</trade_type>";
        formData  += "<sign>"+sign+"</sign>";
        formData  += "</xml>";
    
        console.log('formData===',formData);
    
        var url = 'https://api.mch.weixin.qq.com/pay/unifiedorder';
    
        request({url:url,method:'POST',body: formData},function(err,response,body){
            if(!err && response.statusCode == 200){
                console.log(body);
    
                xmlreader.read(body.toString("utf-8"), function (errors, response) {
                    if (null !== errors) {
                        console.log(errors)
                        return;
                    }
                    console.log('长度===', response.xml.prepay_id.text().length);
                    var prepay_id = response.xml.prepay_id.text();
                    console.log('解析后的prepay_id==',prepay_id);
    
    
                    //将预支付订单和其他信息一起签名后返回给前端
                    let finalsign = wxutil.paysignjsapifinal(appid,mch_id,prepay_id,nonce_str,timestamp,mchkey);
    
                    res.json({'appId':appid,'partnerId':mchid,'prepayId':prepay_id,'nonceStr':nonce_str,'timeStamp':timestamp,'package':'Sign=wxutil','sign':finalsign});
    
                });
    
    
            }
        });
    },
}

module.exports = wxpay;