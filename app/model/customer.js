import { InfoCrudMixin } from 'lin-mizar';
import { merge } from 'lodash';
import { Sequelize, Model } from 'sequelize';
import sequelize from '../lib/db';

class Customer extends Model {
  toJSON () {
    const origin = {
      id: this.id,
      openid: this.openid,
      nickname: this.nickname,
      sex: this.sex,
      province: this.province,
      city: this.city,
      country: this.country,
      headimgurl: this.headimgurl
    };
    return origin;
  }
}

Customer.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    openid: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    nickname: {
      type: Sequelize.STRING(100),
      allowNull: true,
    },
    sex: {
      type: Sequelize.STRING(2),
      allowNull: true
    },
    province: {
      type: Sequelize.STRING(300),
      allowNull: true
    },
    city: {
      type: Sequelize.STRING(300),
      allowNull: true,
    },
    country: {
      type: Sequelize.STRING(300),
      allowNull: true
    },
    headimgurl: {
      type: Sequelize.STRING(500),
      allowNull: true
    },
  },
  merge(
    {
      sequelize,
      tableName: 'wx_user',
      modelName: 'wx_user'
    },
    InfoCrudMixin.options
  )
);

export { Customer };
