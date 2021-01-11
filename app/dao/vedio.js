import { NotFound, Forbidden } from 'lin-mizar';
import Sequelize from 'sequelize';
import { Vedio } from '../model/vedio';
import { Type } from '../model/type';

class VedioDao {
  
  async getVedio (id) {
    const vedio = await Vedio.findOne({
      where: {
        id
      }
    });
    return vedio;
  }

  async getVedioByKeyword (q) {
    const vedio = await Vedio.findOne({
      where: {
        title: {
          [Sequelize.Op.like]: `%${q}%`
        }
      }
    });
    return vedio;
  }

  async getVedios () {
    const vedios = await Vedio.findAndCountAll({
      attributes: {
        include: [
          [Sequelize.col('type.name'), 'typeName']
        ]
      },
      include: [{
        model: Type,
        as: 'type',
        attributes: []
      }],
      raw:true
    });
    return vedios;
  }

  async createVedio (v) {
    // const vedio = await Vedio.findOne({
    //   where: {
    //     title: v.get('body.title')
    //   }
    // });
    // if (vedio) {
    //   throw new Forbidden({
    //     code: 10254
    //   });
    // }
    const vd = new Vedio();
    vd.typeId = v.get('body.typeId');
    vd.title = v.get('body.title');
    vd.author = v.get('body.author');
    vd.summary = v.get('body.summary');
    vd.image = v.get('body.image');
    vd.url = v.get('body.url');
    vd.price = v.get('body.price');
    await vd.save();
  }

  async updateVedio (v, id) {
    const vedio = await Vedio.findByPk(id);
    if (!vedio) {
      throw new NotFound({
        code: 10253
      });
    }
    vedio.typeId = v.get('body.typeId');
    vedio.title = v.get('body.title');
    vedio.author = v.get('body.author');
    vedio.summary = v.get('body.summary');
    vedio.image = v.get('body.image');
    vedio.url = v.get('body.url');
    vedio.price = v.get('body.price');
    await vedio.save();
  }

  async deleteVedio (id) {
    const vedio = await Vedio.findOne({
      where: {
        id
      }
    });
    if (!vedio) {
      throw new NotFound({
        code: 18
      });
    }
    vedio.destroy();
  }
}

export { VedioDao };
