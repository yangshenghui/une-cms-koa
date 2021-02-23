import { InfoCrudMixin } from 'lin-mizar';
import { merge } from 'lodash';
import { Sequelize, Model } from 'sequelize';
import sequelize from '../lib/db';
import { Type } from '../model/type';

class Vedio extends Model {
  toJSON () {
    const origin = {
      id: this.id,
      typeId: this.typeId,
      title: this.title,
      author: this.author,
      summary: this.summary,
      image: this.image,
      url: this.url,
      pdfurl: this.pdfurl,
      price: this.price
    };
    return origin;
  }
}

Vedio.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    typeId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    title: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    author: {
      type: Sequelize.STRING(30),
      allowNull: true,
      defaultValue: '未名'
    },
    summary: {
      type: Sequelize.STRING(1000),
      allowNull: true
    },
    image: {
      type: Sequelize.STRING(1000),
      allowNull: true
    },
    url: {
      type: Sequelize.STRING(1000),
      allowNull: false
    },
    pdfurl: {
      type: Sequelize.STRING(1000),
      allowNull: true
    },
    price: {
      type: Sequelize.STRING(1000),
      allowNull: false
    }
  },
  merge(
    {
      sequelize,
      tableName: 'une_vedio',
      modelName: 'vedio'
    },
    InfoCrudMixin.options
  )
);

Vedio.belongsTo(Type, { foreignKey: 'typeId'});


export { Vedio };
