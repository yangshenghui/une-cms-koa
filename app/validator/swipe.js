import { LinValidator, Rule } from 'lin-mizar';

class SwipeSearchValidator extends LinValidator {
  constructor () {
    super();
    this.q = new Rule('isNotEmpty', '必须传入搜索关键字');
  }
}

class CreateOrUpdateSwipeValidator extends LinValidator {
  constructor () {
    super();
    this.image = new Rule('isNotEmpty', '必须传入封面');
    this.url = new Rule('isNotEmpty', '必须传入链接');
  }
}

export { CreateOrUpdateSwipeValidator, SwipeSearchValidator };
