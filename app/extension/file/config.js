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
    AccessKey: "86j9JhIB82yVQ3nQdqWO6UEDHvtN1RZ4tAtAbRlq",
    SecretKey: "TkuLwJ2rgo9aFqZggrYgOt8MjEgt0fuD0YV4clOU",
    Bucket: "une",
    Domain: "qmmb7uflf.hn-bkt.clouddn.com"
  },
  wx: {
    appid: "",
    secret: "",
    mch_id: "",
    authorize_redirect_url: "", 
    notify_url: "",
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
