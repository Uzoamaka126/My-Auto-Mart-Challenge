/* eslint-disable import/no-unresolved */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
// import bycrypt from 'bycrypt';
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

const UserController = {
  createUsers,
};
export default UserController;
