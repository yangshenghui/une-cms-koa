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
      headimgurl: this.headimgurl,
      phone: this.phone,
      name: this.name,
      email: this.email,
      company: this.company,
      position: this.position,
      ismember: this.ismember,
      issendemail: this.issendemail
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
    phone: {
      type: Sequelize.STRING(18),
      allowNull: false
    },
    name: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    email: {
      type: Sequelize.STRING(30),
      allowNull: false
    },
    company: {
      type: Sequelize.STRING(100),
      allowNull: true
    },
    position: {
      type: Sequelize.STRING(100),
      allowNull: true
    },
    ismember: {
      type: Sequelize.INTEGER,
      allowNull: false,
       defaultValue: 0,
    },
    issendemail: {
      type: Sequelize.INTEGER,
      allowNull: false,
       defaultValue: 0,
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
