import { LinRouter, NotFound, disableLoading } from 'lin-mizar';
import { groupRequired } from '../../middleware/jwt';
import { PositiveIdValidator } from '../../validator/common';

import { getSafeParamId } from '../../lib/util';
import { CustomerDao } from '../../dao/customer';

const customerApi = new LinRouter({
  prefix: '/v1/customer',
  module: '用户'
});

const customerDto = new CustomerDao();

customerApi.get('/:openid', async ctx => {
  const openid = v.get('path.openid');
  const customer = await customerDto.getCustomer(openid);
  if (!customer) {
    throw new NotFound({
      code: 10260
    });
  }
  ctx.json(customer);
});

customerApi.get('/', async ctx => {
  const customers = await customerDto.getCustomers(ctx);
  ctx.json(customers);
});


customerApi.post('/', async ctx => {
  await customerDto.createcustomer(v);
  ctx.success({
    code: 28
  });
});

customerApi.put('/:id', async ctx => {
  const id = getSafeParamId(ctx);
  await customerDto.updatecustomer(v, id);
  ctx.success({
    code: 29
  });
});

customerApi.linDelete(
  'deletecustomer',
  '/:id',
  customerApi.permission('删除客户'),
  groupRequired,
  async ctx => {
    const v = await new PositiveIdValidator().validate(ctx);
    const id = v.get('path.id');
    await customerDto.deletecustomer(id);
    ctx.success({
      code: 30
    });
  }
);

module.exports = { customerApi, [disableLoading]: false };
