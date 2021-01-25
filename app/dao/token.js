import { Token } from '../model/token';

class TokenDao {
  async getToken (openid) {
    const token = await Token.findO
    ne({
      where: {
        openid
      }
    });
    return token;
  }

  async createToken (v) {
    const token = await Token.findOne({
      where: {
        openid: v.openid
      }
    });
    if (token) {
      token.openid = v.openid;
      token.access_token = v.access_token;
      token.refresh_token = v.refresh_token;
      token.expires_in = v.expires_in;
      await token.save();
    } else {
      const tk = new Token();
      tk.openid = v.openid;
      tk.access_token = v.access_token;
      tk.refresh_token = v.refresh_token;
      tk.expires_in = v.expires_in;
      await tk.save();
    }
  }
}

export { TokenDao };
