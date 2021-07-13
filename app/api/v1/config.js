import { LinRouter, NotFound, disableLoading } from 'lin-mizar';
import { groupRequired } from '../../middleware/jwt';
import { PositiveIdValidator } from '../../validator/common';
import {
  CreateOrUpdateConfigValidator
} from '../../validator/config';
import { getSafeParamId } from '../../lib/util';
import { ConfigDao } from '../../dao/config';

const configApi = new LinRouter({
  prefix: '/v1/config',
  module: '配置分类'
});

const configDto = new ConfigDao();

configApi.get('/:id', async ctx => {
  const v = await new PositiveIdValidator().validate(ctx);
  const id = v.get('path.id');
  const config = await configDto.getConfig(id);
  if (!config) {
    throw new NotFound({
      code: 10263
    });
  }
  ctx.json(config);
});

configApi.get('/', async ctx => {
  const configs = await configDto.getConfigs();
  ctx.json(configs);
});

configApi.post('/', async ctx => {
  const v = await new CreateOrUpdateConfigValidator().validate(ctx);
  console.log(v)
  await configDto.createConfig(v);
  ctx.success({
    code: 32
  });
});

configApi.put('/:id', async ctx => {
  const v = await new CreateOrUpdateConfigValidator().validate(ctx);
  const id = getSafeParamId(ctx);
  await configDto.updateConfig(v, id);
  ctx.success({
    code: 33
  });
});

configApi.linDelete(
  'deleteConfig',
  '/:id',
  configApi.permission('删除配置分类'),
  groupRequired,
  async ctx => {
    const v = await new PositiveIdValidator().validate(ctx);
    const id = v.get('path.id');
    await configDto.deleteConfig(id);
    console.log(v)
    ctx.success({
      code: 34
    });
  }
);

module.exports = { configApi, [disableLoading]: false };
