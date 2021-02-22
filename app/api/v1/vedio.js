import { LinRouter, NotFound, disableLoading } from 'lin-mizar';
import { groupRequired } from '../../middleware/jwt';
import {
  CreateOrUpdateVedioValidator
} from '../../validator/vedio';
import { PositiveIdValidator } from '../../validator/common';

import { getSafeParamId } from '../../lib/util';
import { VedioDao } from '../../dao/vedio';

const vedioApi = new LinRouter({
  prefix: '/v1/vedio',
  module: '视频'
});

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
  ctx.json(vedios);
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
