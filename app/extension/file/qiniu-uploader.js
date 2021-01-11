import { config } from 'lin-mizar';
import fs from 'fs';
import path from 'path';
import qiniu from 'qiniu';


class QiniuUploader {
    async getToken () {
        const Domain = config.getItem('qiniu.Domain', '');
        const AccessKey = config.getItem('qiniu.AccessKey', '');
        const SecretKey = config.getItem('qiniu.SecretKey', '');
        const Bucket = config.getItem('qiniu.Bucket', '');

        const mac = new qiniu.auth.digest.Mac(AccessKey, SecretKey);
        const putPolicy = new qiniu.rs.PutPolicy({ scope: Bucket, fsizeLimit: 2048 * 1024 * 1024 });
        const token = putPolicy.uploadToken(mac);

        const data = {
            uptoken: token,
            domain: Domain
        }
        return data;
    }

    async upload () {
        const Bucket = config.getItem('Bucket', '');
        const options = {
            scope: Bucket,            
            returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}'
        };
        const putPolicy = new qiniu.rs.PutPolicy(options);
    }

}

module.exports = { QiniuUploader };