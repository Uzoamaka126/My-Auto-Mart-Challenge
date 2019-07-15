import pool from '../database/connections';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import userData from '../models/userModel'

dotenv.config();

class User {
  static newUser(info) {
    return new Promise((resolve, reject) => {
      pool.query(`INSERT INTO   users (first_name, last_name, email, password, address, token) VALUES ('${info.first_name}', '${info.last_name}', '${info.email}', '${info.password}', '${info.address}', '${info.token}') returning *`)
      .then(results => resolve(results))
      .catch(error => reject(error));
    });
  }

  static getSingleUser(email) {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT * FROM users WHERE email = '${email}'`)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  static storeSingleUserToken(id, token) {
    return new Promise((resolve, reject) => {
      pool.query(`UPDATE users SET token =  '${token}' WHERE id = ${id} returning *`)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  static getAllUsers() {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM users')
        .then(results => resolve(results))
        .catch(error => reject(error));
    });
  }

  static getSingleUserByToken(token) {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT * FROM users WHERE token =  '${token}'`)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }
}

export default User;