import { NotFound, Forbidden } from 'lin-mizar';
import Sequelize from 'sequelize';
import { Swipe } from '../model/swipe';

class SwipeDao {
  async getSwipe (id) {
    const swipe = await Swipe.findOne({
      where: {
        id
      }
    });
    return swipe;
  }

  async getSwipeByKeyword (q) {
    const swipe = await Swipe.findOne({
      where: {
        title: {
          [Sequelize.Op.like]: `%${q}%`
        }
      }
    });
    return swipe;
  }

  async getSwipes () {
    const swipes = await Swipe.findAndCountAll();
    return swipes;
  }

  async createSwipe (v) {
    const bk = new Swipe();
    bk.image = v.get('body.image');
    bk.url = v.get('body.url');
    bk.order = v.get('body.order');
    await bk.save();
  }

  async updateSwipe (v, id) {
    const swipe = await Swipe.findByPk(id);
    if (!swipe) {
      throw new NotFound({
        code: 10058
      });
    }
    swipe.image = v.get('body.image');
    swipe.url = v.get('body.url');
    swipe.order = v.get('body.order');
    await swipe.save();
  }

  async deleteSwipe (id) {
    const swipe = await Swipe.findOne({
      where: {
        id
      }
    });
    if (!swipe) {
      throw new NotFound({
        code: 10058
      });
    }
    swipe.destroy();
  }
}

export { SwipeDao };
