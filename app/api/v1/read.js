import { LinRouter, NotFound, disableLoading } from 'lin-mizar';
import { groupRequired } from '../../middleware/jwt';
import {
  CreateOrUpdateReadValidator
} from '../../validator/read';
import { PositiveIdValidator } from '../../validator/common';

import { getSafeParamId } from '../../lib/util';
import { ReadDao } from '../../dao/read';

const readApi = new LinRouter({
  prefix: '/v1/read',
  module: '资料'
});

const readDto = new ReadDao();

readApi.get('/:id', async ctx => {
  const v = await new PositiveIdValidator().validate(ctx);
  const id = v.get('path.id');
  const read = await readDto.getRead(id);
  if (!read) {
    throw new NotFound({
      code: 10059
    });
  }
  ctx.json(read);
});

readApi.get('/', async ctx => {
  const reads = await readDto.getReads();
  console.log(reads)
  ctx.json(reads);
});

readApi.post('/', async ctx => {
  const v = await new CreateOrUpdateReadValidator().validate(ctx);
  await readDto.createRead(v);
  ctx.success({
    code: 25
  });
});

readApi.put('/:id', async ctx => {
  const v = await new CreateOrUpdateReadValidator().validate(ctx);
  const id = getSafeParamId(ctx);
  await readDto.updateRead(v, id);
  ctx.success({
    code: 26
  });
});

readApi.linDelete(
  'deleteRead',
  '/:id',
  readApi.permission('删除资料'),
  groupRequired,
  async ctx => {
    const v = await new PositiveIdValidator().validate(ctx);
    const id = v.get('path.id');
    await readDto.deleteRead(id);
    ctx.success({
      code: 27
    });
  }
);

module.exports = { readApi, [disableLoading]: false };
