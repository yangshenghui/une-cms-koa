import { LinValidator, Rule } from 'lin-mizar';

class ReadSearchValidator extends LinValidator {
  constructor () {
    super();
    this.q = new Rule('isNotEmpty', '必须传入搜索关键字');
  }
}

class CreateOrUpdateReadValidator extends LinValidator {
  constructor () {
    super();
    this.name = new Rule('isNotEmpty', '必须传入资料名称');
    this.url = new Rule('isNotEmpty', '必须传入资料链接');
  }
}

export { CreateOrUpdateReadValidator, ReadSearchValidator };
