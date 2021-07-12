import { NotFound } from 'lin-mizar';
import Sequelize from 'sequelize';
import { Customer } from '../model/customer';

class CustomerDao {
  
  async getCustomer (openid) {
    const customer = await Customer.findOne({
      where: {
        openid
      }
    });
    return customer;
  }

  async getCustomers () {
    const customers = await Customer.findAndCountAll();
    return customers;
  }

  async createCustomer (v) {
    const customer = await Customer.findOne({
      where: {
        openid: v.openid
      }
    });
    if (customer) {
      customer.openid = v.openid;
      customer.nickname = v.nickname;
      customer.sex = v.sex;
      customer.province = v.province;
      customer.city = v.gcity;
      customer.country = v.country;
      customer.headimgurl = v.headimgurl;
      customer.name = v.name;
      customer.phone = v.phone;
      customer.email = v.email;
      customer.company = v.company;
      customer.position = v.position;
      customer.issendemail = v.issendemail;
      customer.ismember = v.ismember;
      await customer.save();
    } else {
      const ct = new Customer();
      ct.openid = v.openid;
      ct.nickname = v.nickname;
      ct.sex = v.sex;
      ct.province = v.province;
      ct.city = v.city;
      ct.country = v.country;
      ct.headimgurl = v.headimgurl;
      ct.name = v.name;
      ct.phone = v.phone;
      ct.email = v.email;
      ct.company = v.company;
      ct.position = v.position;
      ct.issendemail = v.issendemail;
      ct.ismember = v.ismember;
      await ct.save();
    } 
  }

  async deleteCustomer (openid) {
    const customer = await Customer.findOne({
      where: {
        openid
      }
    });
    if (!customer) {
      throw new NotFound({
        code: 10261
      });
    }
    customer.destroy();
  }
}

export { CustomerDao };
