import { LinRouter, disableLoading } from 'lin-mizar';
import { QiniuUploader } from '../../extension/file/qiniu-uploader';

// qiniu 的红图实例
const qiniuApi = new LinRouter({
  prefix: '/v1/qiniu',
  module: '七牛云'
});

// qiniu 的dao 数据库访问层实例


qiniuApi.get('/', async ctx => {
  const uploader = new QiniuUploader();
  const arr = await uploader.getToken();
  ctx.json(arr);
});



module.exports = { qiniuApi, [disableLoading]: false };
