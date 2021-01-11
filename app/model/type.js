import { InfoCrudMixin } from 'lin-mizar';
import { merge } from 'lodash';
import { Sequelize, Model } from 'sequelize';
import sequelize from '../lib/db';

class Type extends Model {
  toJSON () {
    const origin = {
      id: this.id,
      name: this.name,
      order: this.order
    };
    return origin;
  }
}

Type.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    order: {
      type: Sequelize.INTEGER,
      allowNull: true
    }
  },
  merge(
    {
      sequelize,
      tableName: 'une_order_type',
      modelName: 'type'
    },
    InfoCrudMixin.options
  )
);

export { Type };
