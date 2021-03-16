import { NotFound, Forbidden } from 'lin-mizar';
import Sequelize from 'sequelize';
import { Watch } from '../model/watch';
import { Vedio } from '../model/vedio';
import { Customer } from '../model/customer';

class WatchDao {
  
  async getWatchById (openid) {
    const Watch = await Watch.findOne({
      where: {
        openid
      }
    });
    return Watch;
  }

  async getWatchs (openid, limit) {
    const Watchs = await Watch.findAndCountAll({
      where: {
        openid
      },
      attributes: {
        include: [
          [Sequelize.col('vedio.id'), 'vedioId'],
          [Sequelize.col('vedio.title'), 'vedioTitle'],
          [Sequelize.col('vedio.image'), 'vedioImage'],
          [Sequelize.col('customer.nickname'), 'customerNickname'],
          [Sequelize.col('customer.sex'), 'customerSex'],
          [Sequelize.col('customer.headimgurl'), 'customerHeadimgurl'],

        ]
      },
      include: [{
        model: Vedio,
        as: 'vedio',
        attributes: []
      },{
        model: Customer,
        as: 'customer',
        attributes: []
      }],
      raw:true,
      order: [
        ['id', 'desc']
      ],
      limit: limit,
      offset: 0
    });
    return Watchs;
  }

  async createWatch (v) {
    const watch = await Watch.findOne({
      where: {
        openid: v.openid,
        vedioId: v.vedioId
      }
    });
    if(watch) {
      watch.openid = v.openid;
      watch.vedioId = v.vedioId
      watch.gklog = v.gklog;
      await watch.save();
    }else {
      const vd = new Watch();
      vd. openid=  v.openid;
      vd.vedioId = v.vedioId
      vd.gklog = v.gklog;
      await vd.save();
    }
    
  }

  async deleteWatch (openId) {
    const Watch = await Watch.findOne({
      where: {
        openId
      }
    });
    if (!Watch) {
      throw new NotFound({
        code: 10262
      });
    }
    Watch.destroy();
  }
}

export { WatchDao };
