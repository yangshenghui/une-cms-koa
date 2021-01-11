import { InfoCrudMixin } from 'lin-mizar';
import { merge } from 'lodash';
import { Sequelize, Model } from 'sequelize';
import sequelize from '../lib/db';

class Order extends Model {
  toJSON () {
    const origin = {
      id: this.id,
      vedio_id: this.vedio_id,
      out_trade_no: this.out_trade_no,
      time_expire: this.time_expire,
      total: this.total,
      currency: this.currency,
      openid: this.openid,
      payer_client_ip: this.payer_client_ip,
      status: this.status
    };
    return origin;
  }
}

Order.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    vedio_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    out_trade_no: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false
    },
    time_expire: {
      type: Sequelize.STRING(64),
      allowNull: true
    },
    total: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    currency: {
      type: Sequelize.STRING(6),
      allowNull: false
    },
    openid: {
      type: Sequelize.STRING(128),
      allowNull: false
    },
    payer_client_ip: {
      type: Sequelize.STRING(45),
      allowNull: false
    },
    status: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    }
  },
  merge(
    {
      sequelize,
      tableName: 'une_order',
      modelName: 'order'
    },
    InfoCrudMixin.options
  )
);

export { Order };
