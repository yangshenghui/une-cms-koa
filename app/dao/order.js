import { NotFound, Forbidden } from 'lin-mizar';
import Sequelize from 'sequelize';
import { Order } from '../model/order';

class OrderDao {
  async getOrder (id) {
    const order = await Order.findOne({
      where: {
        id
      }
    });
    return order;
  }

  async getOrderByKeyword (q) {
    const order = await Order.findOne({
      where: {
        title: {
          [Sequelize.Op.like]: `%${q}%`
        }
      }
    });
    return order;
  }

  async getOrders () {
    const orders = await Order.findAndCountAll();
    return orders;
  }

  async createOrder (v) {
    const vd = new Order();
    vd.vedio_id = v.get('body.vedio_id');
    vd.total = v.get('body.total');
    vd.openid = v.get('body.openid');
    vd.payer_client_ip = v.get('body.payer_client_ip');
    await vd.save();
  }

  async updateOrder (v, id) {
    const order = await Order.findByPk(id);
    if (!order) {
      throw new NotFound({
        code: 10256
      });
    }
    order.status = v.get('body.status');
    await order.save();
  }
}

export { OrderDao };
