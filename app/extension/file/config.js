'use strict';

module.exports = {
  file: {
    storeDir: 'app/assets',
    singleLimit: 1024 * 1024 * 2,
    totalLimit: 1024 * 1024 * 20,
    nums: 10,
    exclude: []
    // include:[]
  },
  qiniu: {
    AccessKey: "ZAMxVeEEDyhRQk8B026_kwnKJYsrQ5Qu8qnhPvbZ",
    SecretKey: "CYCPClzBx8WOcZLjOGZ8R2nXHYDrnSAlkZMhbQF1",
    Bucket: "unechannel",
    Domain: "cdn.unechannel.com"
  },
  wx: {
    // appid: "wx5fe42b994d3adb3c",
    // secret: "1c41546e3e70e897a8d0c7245cd33730",
    
    appid: "wx36c8e825f9847319",
    secret: "27209074756e3210dfd840401a3604a3",
    mch_id: "1604620078",
    api_key: "asaWdoDWFWECSedqwe128381214deqe4",
    notify_url: "http://wx.unechannel.com:5000/v1/weixin/notify",
  },
  wxpay: {
      UNIFIED_ORDER: 'https://api.mch.weixin.qq.com/pay/unifiedorder',
      ORDER_QUERY: 'https://api.mch.weixin.qq.com/pay/orderquery',
      CLOSE_ORDER: 'https://api.mch.weixin.qq.com/pay/closeorder',
      REFUND: 'https://api.mch.weixin.qq.com/secapi/pay/refund',
      REFUND_QUERY: 'https://api.mch.weixin.qq.com/pay/refundquery',
      TRANSFERS: 'https://api.mch.weixin.qq.com/mmpaymkttransfers/promotion/transfers',
      TRNSFER_INFO: 'https://api.mch.weixin.qq.com/mmpaymkttransfers/gettransferinfo',
      TICKET: 'https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=:access_token&type=jsapi',
  }


};
