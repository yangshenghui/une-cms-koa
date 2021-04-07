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
  const now = new Date()
  let month = now.getMonth() + 1
  let day = now.getDate()
  let hour = now.getHours()
  let minutes = now.getMinutes()
  let seconds = now.getSeconds()
  month = this.setTimeDateFmt(month)
  hour = this.setTimeDateFmt(hour)
  minutes = this.setTimeDateFmt(minutes)
  seconds = this.setTimeDateFmt(seconds)
  return now.getFullYear().toString() + month.toString() + day + hour + minutes + seconds + (Math.round(Math.random() * 89 + 100)).toString()
 }

export { getSafeParamId, isOptional, getTradeNo };
