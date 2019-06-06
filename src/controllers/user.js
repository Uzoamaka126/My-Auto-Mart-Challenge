/* eslint-disable import/no-unresolved */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import UserData from '../models/usersData';

dotenv.config();

const createUsers = (req, res) => {
  const newUser = {
    id: 23,
    email: req.body.email,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    password: req.body.password,
    confirm_password: req.body.confirm_password,
    address: req.body.address,
    is_admin: 'false',
  };

  const userDetails = {
    id: 23,
    email: req.body.email,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    password: req.body.password,
    confirm_password: req.body.confirm_password,
    address: req.body.address,
    token: 'sdfreyeejfjklg'
  };

  const token = jwt.sign(userDetails, process.env.secret_key);
  newUser.token = token;
  UserData.push(newUser);
  return res.status(201).json({
    status: 201,
    message: 'User has been successfully created',
    newUser,
  });
};

const signIn = (req, res) => {
  const userInfo = req.body;
  const verifiedUser = UserData.find(
    databaseUser => databaseUser.email === userInfo.email,
  );
  if (!verifiedUser) {
    res.status(404).json({
      status: 'error',
      message: 'User Not Found',
    });
  } else {
    if (verifiedUser.password === userInfo.password) {
      const payload = {
        id: userInfo.id,
        email: userInfo.email,
        isAdmin: userInfo.isAdmin,
      };
      jwt.sign(payload, process.env.secret_key, (err, token) => {
        if (err) {
          throw err;
        } else {
          res.status(201).json({
            status: 'success',
            token: `Bearer ${token}`,
            message: 'User has logged in successfully',
          });
        }
      });
    } else {
      return res.status(400).json({
        status: 400,
          status: 'error',
          message: 'Password Incorrect',
        });
    }
    return false;
  }
};

const UserController = {
  createUsers,
  signIn,
};
export default UserController;
