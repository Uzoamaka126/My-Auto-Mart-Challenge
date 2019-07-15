/* eslint-disable quote-props */
/* eslint-disable quotes */
import moment from 'moment';
import pool from '../database/connections';

class Orders {
  static createNewOrder(order) {
    const orderInfo = {
      buyer: order.buyer,
      car_id: order.car_id,
      created_on: moment.format(),
      status: order.status,
      price_offered: order.price_offered,
    };
    // const createdOn = moment.format();
    return new Promise((resolve, reject) => {
      pool.query(`INSERT INTO orders ( buyer, car_id, created_on, status, price_offered) VALUES ('${order.buyer}', '${order.car_id}', '${order.createdOn}', '${order.status}', '${order.price_offered}') returning *`)
        .then(results => resolve(results))
        .catch(error => reject(error));
    });
  }

  static getSingleOrder(id) {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT * FROM orders where id = '${id}'`)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  static updateSingleOrder(id, old_price, new_price) {
    return new Promise((resolve, reject) => {
      pool.query(`UPDATE orders SET old_price_offered = '${old_price}', new_price_offered = '${new_price}' WHERE id = '${id}' returning *`)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }
}

export default Orders;