/* eslint-disable quote-props */
/* eslint-disable quotes */
import pool from '../database/connections';

class User {
  static getAllUsers() {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM users')
        .then(results => resolve(results))
        .catch(error => reject(error));
    });
  }

  static getUser(id) {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT * FROM users WHERE id = ${id}`)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  static createNewUser(userDetails) {
    return new Promise((resolve, reject) => {
      pool.query(`INSERT INTO users ( first_name, last_name, email, password, address, token, is_admin) VALUES ('${userDetails.first_name}', '${userDetails.last_name}','${userDetails.email}', '${userDetails.password}', '${userDetails.address}', '${userDetails.token}', '${userDetails.is_admin}', 'user') returning *`)
        .then(results => resolve(results))
        .catch(error => reject(error));
    });
  }

  static updateUserPassword(userDetails, newPassword) {
    return new Promise((resolve, reject) => {
      pool.query(`UPDATE users SET password = '${newPassword}' WHERE id = ${userDetails.id}   returning *`)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }
}