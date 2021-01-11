import { LinRouter, disableLoading } from 'lin-mizar';

import { OrderDao } from '../../dao/order';

// order 的红图实例
const orderApi = new LinRouter({
  prefix: '/v1/order',
  module: '订单'
});

// order 的dao 数据库访问层实例
const orderDto = new OrderDao();

orderApi.get('/:id', async ctx => {
  const v = await new PositiveIdValidator().validate(ctx);
  const id = v.get('path.id');
  const order = await orderDto.getOrder(id);
  if (!order) {
    throw new NotFound({
      code: 10253
    });
  }
  ctx.json(order);
});

orderApi.get('/', async ctx => {
  const orders = await orderDto.getOrders();
  ctx.json(orders);
});

orderApi.get('/search/one', async ctx => {
  const v = await new OrderSearchValidator().validate(ctx);
  const order = await orderDto.getOrderByKeyword(v.get('query.q'));
  if (!order) {
    throw new OrderNotFound();
  }
  ctx.json(order);
});

orderApi.post('/', async ctx => {
  const v = await new CreateOrUpdateOrderValidator().validate(ctx);
  await orderDto.createOrder(v);
  ctx.success({
    code: 16
  });
});

module.exports = { orderApi, [disableLoading]: false };
