import { NotFound, Forbidden } from 'lin-mizar';
import Sequelize from 'sequelize';
import { Vedio } from '../model/vedio';

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
    const vedios = await Vedio.findAll();
    return vedios;
  }

  async createVedio (v) {
    const vedio = await Vedio.findOne({
      where: {
        title: v.get('body.title')
      }
    });
    if (vedio) {
      throw new Forbidden({
        code: 10240
      });
    }
    const vd = new Vedio();
    vd.title = v.get('body.title');
    vd.author = v.get('body.author');
    vd.summary = v.get('body.summary');
    vd.image = v.get('body.image');
    await vd.save();
  }

  async updateVedio (v, id) {
    const vedio = await Vedio.findByPk(id);
    if (!vedio) {
      throw new NotFound({
        code: 10022
      });
    }
    vedio.title = v.get('body.title');
    vedio.author = v.get('body.author');
    vedio.summary = v.get('body.summary');
    vedio.image = v.get('body.image');
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
        code: 10022
      });
    }
    vedio.destroy();
  }
}

export { VedioDao };
