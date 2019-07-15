/* eslint-disable import/no-unresolved */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import UserData from '../models/usersData';
import bcrypt from 'bcrypt';

dotenv.config();

const secret_key = process.env.JWT_SECRET;

const createUsers = (req, res) => {
    const { first_name, last_name, email, password, addresss } = req.body;
    const passwordHash = bcrypt.hashSync(password, 10);
    const userInfo = { first_name, last_name, email, password: passwordHash, addresss };
    try {
      UserData.newUser(userInfo).then((values) => {
        const token = jwt.sign(userInfo, secret_key);
        const result = values.rows;
        console.log(result)

        if (result.length > 0) {
          const { id } = result[0];
          UserData.storeSingleUserToken(id, token)
          .then((resultBody) => {
            console.log(resultBody)
            const resultValue = resultBody.rows;
            res.status(201).json({
              status: 'Successful',
              message: `Hey!, ${first_name}`,
              data: {
                data: resultValue,
              }
            });
          });
        }
      });
    } catch(error) {
      return res.status(500).json({
        status: 'False',
        message: 'Unable to create Users'
      });
    }
};

const userLogin = (req, res) => {
  const userInfo = req.body;
  UserData.get(userInfo.email).then((results) => {
    const oldUserDetails = results.rows;
    if (oldUserDetails.length < 1) {
      res.status(404).json({
        status: 'error',
        message: 'User Not Found',
      });
    } else {
      bcrypt.compare(userInfo.password, oldUserDetails[0].password, (error, result) => {
        if (error) {
          return res
            .status(400)
            .json({
              status: 'error',
              message: 'Password Incorrect',
            });
        }
        if (result) {
          jwt.sign(oldUserDetails[0], process.env.JWT_SECRET, (err, token) => {
            if (err) {
              throw err;
            } else {
              res.status(201).json({
                status: 'success',
                token: `Bearer ${token}`,
                message: 'Login Succesful',
              });
            }
          });
        }
      });
    }
  });
}
  const UserController = {
    createUsers,
    userLogin
  };

  export default UserController;