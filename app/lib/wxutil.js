var fs = require("fs");
 
 
var wxutil = {
 
    //把金额转为分
    getmoney: function (money) {
        return parseFloat(money) * 100;
    },
 
    // 随机字符串产生函数  
    createNonceStr: function () {
        return Math.random().toString(36).substr(2, 15);
    },
 
    // 时间戳产生函数  
    createTimeStamp: function () {
        return parseInt(new Date().getTime() / 1000) + '';
    },
 
    //签名加密算法
    paysignjsapi: function (appid, body, mch_id, nonce_str, notify_url, out_trade_no, spbill_create_ip, total_fee, trade_type, mchkey) {
        var ret = {
            appid: appid,
            mch_id: mch_id,
            nonce_str: nonce_str,
            body: body,
            notify_url: notify_url,
            out_trade_no: out_trade_no,
            spbill_create_ip: spbill_create_ip,
            total_fee: total_fee,
            trade_type: trade_type
        };
        console.log('ret==', ret);
        var string = raw(ret);
        var key = mchkey;
        string = string + '&key=' + key;
        console.log('string=', string);
        var crypto = require('crypto');
        return crypto.createHash('md5').update(string, 'utf8').digest('hex').toUpperCase();
    },

    //签名加密算法,第二次的签名
    paysignjsapifinal: function (appid,mch_id,prepayid,noncestr,timestamp,mchkey) {
        var ret = {
            appid: appid,
            partnerid: mch_id,
            prepayid: prepayid,
            package: 'Sign=WXPay',
            noncestr: noncestr,
            timestamp: timestamp,
        };
        console.log('retretret==', ret);
        var string = raw(ret);
        var key = mchkey;
        string = string + '&key=' + key;
        console.log('stringstringstring=', string);
        var crypto = require('crypto');
        return crypto.createHash('md5').update(string, 'utf8').digest('hex').toUpperCase();
    },
}
function raw(args) {
    var keys = Object.keys(args);
    keys = keys.sort()
    var newArgs = {};
    keys.forEach(function (key) {
        newArgs[key] = args[key];
    });
    var string = '';
    for (var k in newArgs) {
        string += '&' + k + '=' + newArgs[k];
    }
    string = string.substr(1);
    return string;
}
 
module.exports = wxutil;