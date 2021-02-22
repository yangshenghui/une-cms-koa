import { LinValidator, Rule } from 'lin-mizar';

class VedioSearchValidator extends LinValidator {
  constructor () {
    super();
    this.q = new Rule('isNotEmpty', '必须传入搜索关键字');
  }
}

class CreateOrUpdateVedioValidator extends LinValidator {
  constructor () {
    super();
    this.title = new Rule('isNotEmpty', '必须传入视频名称');
    this.summary = new Rule('isNotEmpty', '必须传入视频简介');
    this.url = new Rule('isNotEmpty', '必须传入视频链接');
    this.price = new Rule('isNotEmpty', '必须传入视频单价');
  }
}

export { CreateOrUpdateVedioValidator, VedioSearchValidator };
