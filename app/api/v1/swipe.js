import { LinRouter, NotFound, disableLoading } from 'lin-mizar';
import { groupRequired } from '../../middleware/jwt';
import {
  CreateOrUpdateSwipeValidator
} from '../../validator/swipe';
import { PositiveIdValidator } from '../../validator/common';

import { getSafeParamId } from '../../lib/util';
import { SwipeDao } from '../../dao/swipe';

// swipe 的红图实例
const swipeApi = new LinRouter({
  prefix: '/v1/swipe',
  module: '广告'
});

// swipe 的dao 数据库访问层实例
const swipeDto = new SwipeDao();

swipeApi.get('/:id', async ctx => {
  const v = await new PositiveIdValidator().validate(ctx);
  const id = v.get('path.id');
  const swipe = await swipeDto.getSwipe(id);
  if (!swipe) {
    throw new NotFound({
      code: 10058
    });
  }
  ctx.json(swipe);
});

swipeApi.get('/', async ctx => {
  const swipes = await swipeDto.getSwipes();
  ctx.json(swipes);
});

swipeApi.post('/', async ctx => {
  const v = await new CreateOrUpdateSwipeValidator().validate(ctx);
  await swipeDto.createSwipe(v);
  ctx.success({
    code: 22
  });
});

swipeApi.put('/:id', async ctx => {
  const v = await new CreateOrUpdateSwipeValidator().validate(ctx);
  const id = getSafeParamId(ctx);
  await swipeDto.updateSwipe(v, id);
  ctx.success({
    code: 23
  });
});

swipeApi.linDelete(
  'deleteSwipe',
  '/:id',
  swipeApi.permission('删除广告'),
  groupRequired,
  async ctx => {
    const v = await new PositiveIdValidator().validate(ctx);
    const id = v.get('path.id');
    await swipeDto.deleteSwipe(id);
    ctx.success({
      code: 24
    });
  }
);

module.exports = { swipeApi, [disableLoading]: false };
