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
    // this.author = new Rule('isNotEmpty', '必须传入图书作者');
    this.summary = new Rule('isNotEmpty', '必须传入视频简介');
    // this.image = new Rule('isNotEmpty', '必须传入视频封面');
    this.url = new Rule('isNotEmpty', '必须传入视频链接');
    this.price = new Rule('isNotEmpty', '必须传入视频单价');
  }
}

export { CreateOrUpdateVedioValidator, VedioSearchValidator };
