import { InfoCrudMixin } from 'lin-mizar';
import { merge } from 'lodash';
import { Sequelize, Model } from 'sequelize';
import sequelize from '../lib/db';

class Swipe extends Model {
  toJSON () {
    const origin = {
      id: this.id,
      image: this.image,
      url: this.url,
      order: this.order
    };
    return origin;
  }
}

Swipe.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    image: {
      type: Sequelize.STRING(400),
      allowNull: false
    },
    url: {
      type: Sequelize.STRING(400),
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
      tableName: 'une-swipe',
      modelName: 'swipe'
    },
    InfoCrudMixin.options
  )
);

export { Swipe };
