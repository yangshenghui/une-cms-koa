import { LinRouter, NotFound, disableLoading } from 'lin-mizar';
import { groupRequired } from '../../middleware/jwt';
import {
  VedioSearchValidator,
  CreateOrUpdateVedioValidator
} from '../../validator/vedio';
import { PositiveIdValidator } from '../../validator/common';

import { getSafeParamId } from '../../lib/util';
import { VedioNotFound } from '../../lib/exception';
import { VedioDao } from '../../dao/vedio';

// vedio 的红图实例
const vedioApi = new LinRouter({
  prefix: '/v1/vedio',
  module: '视频'
});

// vedio 的dao 数据库访问层实例
const vedioDto = new VedioDao();

vedioApi.get('/:id', async ctx => {
  const v = await new PositiveIdValidator().validate(ctx);
  const id = v.get('path.id');
  const vedio = await vedioDto.getVedioById(id);
  if (!vedio) {
    throw new NotFound({
      code: 10253
    });
  }
  ctx.json(vedio);
});

vedioApi.get('/', async ctx => {
  const vedios = await vedioDto.getVedios(ctx);
  console.log(vedios)
  ctx.json(vedios);
});

vedioApi.get('/search/one', async ctx => {
  const v = await new VedioSearchValidator().validate(ctx);
  const vedio = await vedioDto.getVedioByKeyword(v.get('query.q'));
  if (!vedio) {
    throw new VedioNotFound();
  }
  ctx.json(vedio);
});

vedioApi.post('/', async ctx => {
  const v = await new CreateOrUpdateVedioValidator().validate(ctx);
  await vedioDto.createVedio(v);
  ctx.success({
    code: 16
  });
});

vedioApi.put('/:id', async ctx => {
  const v = await new CreateOrUpdateVedioValidator().validate(ctx);
  const id = getSafeParamId(ctx);
  await vedioDto.updateVedio(v, id);
  ctx.success({
    code: 17
  });
});

vedioApi.linDelete(
  'deleteVedio',
  '/:id',
  vedioApi.permission('删除视频'),
  groupRequired,
  async ctx => {
    const v = await new PositiveIdValidator().validate(ctx);
    const id = v.get('path.id');
    await vedioDto.deleteVedio(id);
    ctx.success({
      code: 18
    });
  }
);

module.exports = { vedioApi, [disableLoading]: false };
