import { toSafeInteger, get, isInteger } from 'lodash';
import { ParametersException } from 'lin-mizar';

function getSafeParamId (ctx) {
  const id = toSafeInteger(get(ctx.params, 'id'));
  if (!isInteger(id)) {
    throw new ParametersException({
      code: 10030
    });
  }
  return id;
}

function isOptional (val) {
  // undefined , null , ""  , "    ", 皆通过
  if (val === undefined) {
    return true;
  }
  if (val === null) {
    return true;
  }
  if (typeof val === 'string') {
    return val === '' || val.trim() === '';
  }
  return false;
}

function getTradeNo() {
  // 存放订单号
  let orderCode = '';
    
  // 6位随机数(加在时间戳后面)
  for (var i = 0; i < 6; i++)
  { 
    orderCode += Math.floor(Math.random() * 10);
  }

  // 时间戳(用来生成订单号)
  orderCode = 'D' + new Date().getTime() + orderCode;

  // 打印
  return orderCode
}

export { getSafeParamId, isOptional, getTradeNo };
