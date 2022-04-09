import { NotFound, Forbidden } from 'lin-mizar';
import Sequelize from 'sequelize';
import { Config } from '../model/config';
import { Type } from '../model/type';

class ConfigDao {

  async getConfigByType (type) {
    const config = await Config.findOne({
      where: {
        type
      }
    });
    return config;
  }
  
  async getConfig (id) {
    const config = await Config.findOne({
      where: {
        id
      }
    });
    return config;
  }

  async getConfigs () {
    const configs = await Config.findAndCountAll();
    return configs;
  }

  async createConfig (v) {
    const vd = new Config();
    vd.type = v.get('body.type');
    vd.name = v.get('body.name');
    vd.value = v.get('body.value');
    await vd.save();
  }

  async updateConfig (v, id) {
    const config = await Config.findByPk(id);
    if (!config) {
      throw new NotFound({
        code: 10263
      });
    }
    config.type = v.get('body.type');
    config.name = v.get('body.name');
    config.value = v.get('body.value');
    await config.save();
  }

  async deleteConfig (id) {
    const config = await Config.findOne({
      where: {
        id
      }
    });
    if (!config) {
      throw new NotFound({
        code: 10263
      });
    }
    config.destroy();
  }
}

export { ConfigDao };
