import { NotFound, Forbidden } from 'lin-mizar';
import Sequelize from 'sequelize';
import { Read } from '../model/read';

class ReadDao {
  async getRead (id) {
    const read = await Read.findOne({
      where: {
        id
      }
    });
    return read;
  }

  async getReads (limit) {
    const reads = await Read.findAndCountAll({
      order: [
        ['id', 'desc']
      ],
      limit: limit,
      offset: 0
    });
    return reads;
  }

  async createRead (v) {
    const bk = new Read();
    bk.name = v.get('body.name');
    bk.url = v.get('body.url');
    await bk.save();
  }

  async updateRead (v, id) {
    const read = await Read.findByPk(id);
    if (!read) {
      throw new NotFound({
        code: 10059
      });
    }
    read.name = v.get('body.name');
    read.url = v.get('body.url');
    await read.save();
  }

  async deleteRead (id) {
    const read = await Read.findOne({
      where: {
        id
      }
    });
    if (!read) {
      throw new NotFound({
        code: 10059
      });
    }
    read.destroy();
  }
}

export { ReadDao };
