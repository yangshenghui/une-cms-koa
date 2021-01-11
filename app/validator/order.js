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
  }
}

export { CreateOrUpdateVedioValidator, VedioSearchValidator };
