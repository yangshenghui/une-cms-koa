import { InfoCrudMixin } from 'lin-mizar';
import { merge } from 'lodash';
import { Sequelize, Model } from 'sequelize';
import sequelize from '../lib/db';

class Config extends Model {
  toJSON () {
    const origin = {
      id: this.id,
      type: this.type,
      name: this.name,
      value: this.value
    };
    return origin;
  }
}

Config.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    type: {
      type: Sequelize.STRING(30),
      allowNull: false
    },
    value: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    name: {
      type: Sequelize.STRING(100),
      allowNull: false
    }
  },
  merge(
    {
      sequelize,
      tableName: 'une_config',
      modelName: 'config'
    },
    InfoCrudMixin.options
  )
);

export { Config };
