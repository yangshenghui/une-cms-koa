import { LinRouter, NotFound, disableLoading } from 'lin-mizar';
import { groupRequired } from '../../middleware/jwt';
import {
  TypeSearchValidator,
  CreateOrUpdateTypeValidator
} from '../../validator/type';
import { PositiveIdValidator } from '../../validator/common';

import { getSafeParamId } from '../../lib/util';
import { TypeNotFound } from '../../lib/exception';
import { TypeDao } from '../../dao/type';

// type 的红图实例
const typeApi = new LinRouter({
  prefix: '/v1/type',
  module: '视频分类'
});

// type 的dao 数据库访问层实例
const typeDto = new TypeDao();

typeApi.get('/:id', async ctx => {
  const v = await new PositiveIdValidator().validate(ctx);
  const id = v.get('path.id');
  const type = await typeDto.getType(id);
  if (!type) {
    throw new NotFound({
      code: 10255
    });
  }
  ctx.json(type);
});

typeApi.get('/', async ctx => {
  const types = await typeDto.getTypes();
  ctx.json(types);
});

typeApi.get('/search/one', async ctx => {
  const v = await new TypeSearchValidator().validate(ctx);
  const type = await typeDto.getTypeByKeyword(v.get('query.q'));
  if (!type) {
    throw new TypeNotFound();
  }
  ctx.json(type);
});

typeApi.post('/', async ctx => {
  const v = await new CreateOrUpdateTypeValidator().validate(ctx);
  await typeDto.createType(v);
  ctx.success({
    code: 19
  });
});

typeApi.put('/:id', async ctx => {
  const v = await new CreateOrUpdateTypeValidator().validate(ctx);
  const id = getSafeParamId(ctx);
  await typeDto.updateType(v, id);
  ctx.success({
    code: 20
  });
});

typeApi.linDelete(
  'deleteType',
  '/:id',
  typeApi.permission('删除视频分类'),
  groupRequired,
  async ctx => {
    const v = await new PositiveIdValidator().validate(ctx);
    const id = v.get('path.id');
    await typeDto.deleteType(id);
    ctx.success({
      code: 21
    });
  }
);

module.exports = { typeApi, [disableLoading]: false };
