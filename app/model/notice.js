import { InfoCrudMixin } from 'lin-mizar';
import { merge } from 'lodash';
import { Sequelize, Model } from 'sequelize';
import sequelize from '../lib/db';

class Notice extends Model {
  toJSON () {
    const origin = {
      id: this.id,
      out_trade_no: this.out_trade_no,
      transaction_id: this.transaction_id,
      trade_type: this.transaction_id,
      trade_state: this.trade_state,
      success_time: this.success_time,
      openid: this.openid,
      total: this.total,
      payer_total: this.payer_total,
      currency: this.currency,
      goods_id: this.goods_id,
      quantity: this.quantity,
      unit_price:this.unit_price
    };
    return origin;
  }
}

Notice.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    out_trade_no: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false
    },
    transaction_id: {
      type: Sequelize.STRING(32),
      allowNull: true
    },
    trade_type: {
      type: Sequelize.STRING(16),
      allowNull: true
    },
    trade_state: {
      type: Sequelize.STRING(32),
      allowNull: false
    },
    success_time: {
      type: Sequelize.STRING(64),
      allowNull: true
    },
    openid: {
      type: Sequelize.STRING(128),
      allowNull: false
    },
    total: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    payer_total: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    currency: {
      type: Sequelize.STRING(16),
      allowNull: true
    },
    goods_id: {
      type: Sequelize.STRING(32),
      allowNull: true
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    unit_price: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0,
    }
  },
  merge(
    {
      sequelize,
      tableName: 'une_order_notice',
      modelName: 'notice'
    },
    InfoCrudMixin.options
  )
);

export { Notice };
