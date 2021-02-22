import { InfoCrudMixin } from 'lin-mizar';
import { merge } from 'lodash';
import { Sequelize, Model } from 'sequelize';
import sequelize from '../lib/db';
import { Vedio } from '../model/vedio';
import { Customer } from '../model/customer';

class Watch extends Model {
  toJSON () {
    const origin = {
      id: this.id,
      openid: this.openid,
      vedioId: this.vedioId,
      gklog: this.gklog
    };
    return origin;
  }
}

Watch.init(
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
    vedioId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    gklog: {
      type: Sequelize.INTEGER,
      allowNull: true
    }
  },
  merge(
    {
      sequelize,
      tableName: 'une_Watch',
      modelName: 'Watch'
    },
    InfoCrudMixin.options
  )
);

Watch.belongsTo(Vedio, {as: 'vedio', foreignKey: 
'vedioId', targetKey: 'id'});
Watch.belongsTo(Customer, {as: 'customer', foreignKey: 
'openid', targetKey: 'openid'});



export { Watch };
