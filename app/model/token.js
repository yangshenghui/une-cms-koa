import { InfoCrudMixin } from 'lin-mizar';
import { merge } from 'lodash';
import { Sequelize, Model } from 'sequelize';
import sequelize from '../lib/db';

class Token extends Model {
  toJSON () {
    const origin = {
      id: this.id,
      openid: this.openid,
      access_token: this.access_token,
      refresh_token:this.refresh_token,
      expires_in: this.expires_in
    };
    return origin;
  }
}

Token.init(
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
    access_token: {
      type: Sequelize.STRING(300),
      allowNull: false
    },
    refresh_token: {
      type: Sequelize.STRING(300),
      allowNull: false
    },
    expires_in: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  },
  merge(
    {
      sequelize,
      tableName: 'wx_token',
      modelName: 'wx_token'
    },
    InfoCrudMixin.options
  )
);

export { Token };
