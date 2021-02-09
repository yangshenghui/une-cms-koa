import { InfoCrudMixin } from 'lin-mizar';
import { merge } from 'lodash';
import { Sequelize, Model } from 'sequelize';
import sequelize from '../lib/db';

class Read extends Model {
  toJSON () {
    const origin = {
      id: this.id,
      name: this.name,
      url: this.url,
    };
    return origin;
  }
}

Read.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING(400),
      allowNull: false
    },
    url: {
      type: Sequelize.STRING(400),
      allowNull: false
    }
  },
  merge(
    {
      sequelize,
      tableName: 'une-read',
      modelName: 'read'
    },
    InfoCrudMixin.options
  )
);

export { Read };
