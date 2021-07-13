import { LinValidator, Rule } from 'lin-mizar';

class ConfigSearchValidator extends LinValidator {
  constructor () {
    super();
    this.q = new Rule('isNotEmpty', '必须传入搜索关键字');
  }
}

class CreateOrUpdateConfigValidator extends LinValidator {
  constructor () {
    super();
    this.type = new Rule('isNotEmpty', '必须传入配置属性');
    this.value = new Rule('isNotEmpty', '必须传入配置值');
  }
}

export { CreateOrUpdateConfigValidator, ConfigSearchValidator };
