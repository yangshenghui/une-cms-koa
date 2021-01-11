import { NotFound, Forbidden } from 'lin-mizar';
import Sequelize from 'sequelize';
import { Type } from '../model/type';

class TypeDao {
  async getType (id) {
    const type = await Type.findOne({
      where: {
        id
      }
    });
    return type;
  }

  async getTypeByKeyword (q) {
    const type = await Type.findOne({
      where: {
        title: {
          [Sequelize.Op.like]: `%${q}%`
        }
      }
    });
    return type;
  }

  async getTypes () {
    const types = await Type.findAndCountAll();
    return types;
  }

  async createType (v) {
    const type = await Type.findOne({
      where: {
        name: v.get('body.name')
      }
    });
    if (type) {
      throw new Forbidden({
        code: 10257
      });
    }
    const vd = new Type();
    vd.name = v.get('body.name');
    vd.order = v.get('body.order');
    await vd.save();
  }

  async updateType (v, id) {
    const type = await Type.findByPk(id);
    if (!type) {
      throw new NotFound({
        code: 10255
      });
    }
    type.name = v.get('body.name');
    type.order = v.get('body.order');
    await type.save();
  }

  async deleteType (id) {
    const type = await Type.findOne({
      where: {
        id
      }
    });
    if (!type) {
      throw new NotFound({
        code: 21
      });
    }
    type.destroy();
  }
}

export { TypeDao };
