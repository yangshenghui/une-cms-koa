import { config } from 'lin-mizar';
import qiniu from 'qiniu';


class QiniuDownload {
    async download () {
        const Domain = config.getItem('qiniu.Domain', '');
        const AccessKey = config.getItem('qiniu.AccessKey', '');
        const SecretKey = config.getItem('qiniu.SecretKey', '');
        const Bucket = config.getItem('qiniu.Bucket', '');
        const mac = new qiniu.auth.digest.Mac(AccessKey, SecretKey);
        const conf = new qiniu.conf.Config();
        const bucketManager = new qiniu.rs.BucketManager(mac, conf);
        const publicBucketDomain = 'http://une.sven-it.com';
        // 公开空间访问链接
        const publicDownloadUrl = bucketManager.publicDownloadUrl(publicBucketDomain, "Ft_0H7oMDex8x0f4NesAYCRvFqs5");
        console.log(publicDownloadUrl);
        return publicDownloadUrl
    }

}

module.exports = { QiniuDownload };