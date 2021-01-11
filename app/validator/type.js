import { LinValidator, Rule } from 'lin-mizar';

class TypeSearchValidator extends LinValidator {
  constructor () {
    super();
    this.q = new Rule('isNotEmpty', '必须传入搜索关键字');
  }
}

class CreateOrUpdateTypeValidator extends LinValidator {
  constructor () {
    super();
    this.name = new Rule('isNotEmpty', '必须传入分类名称');
  }
}

export { CreateOrUpdateTypeValidator, TypeSearchValidator };
