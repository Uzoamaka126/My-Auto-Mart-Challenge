/* eslint-disable import/no-unresolved */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import UserData from '../models/usersData';
import bcrypt from 'bcrypt';

dotenv.config();

const secret_key = process.env.JWT_SECRET;

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
    token: 'sdfreyeejfjklg',
  };
  // const token = jwt.sign(userDetails, process.env.secret_key);
  const token = jwt.sign(newUser, process.env.secret_key);
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

class UsersAuthenticationController {
  static async newUser(req, res) {
    try {
      const { email, first_name, last_name, password, address } = req.body;
      const hash = await bcrypt.hash(password, 10);
      const user = await UserData.create({ email, first_name, last_name, password: hash, address });
      const confirmedUser = {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        address: user.address
      };
      const jwtToken = jwt.sign({ user: confirmedUser }, secret_key, {
        expiresIn: 86000
      });
      return res.status(201).json({
        status: 'success',
        message: 'User has been created successfully',
        token: `Bearer ${jwtToken}`,
        user: confirmedUser
      });
    } catch (err) {
        return res.status(500).json({
          status: 'error',
          message: err.message
        });
      }
  }

  static async loginOldUser(req, res) {
    try {
      const { email, password } = req.body;
      const user = await UserData.findOne({ where: { email }});
      if(!user) {
        throw new Error('This email does not exist');
      }
      const result = await bcrypt.compare(password, user.password);
      if(!result) {
        throw new Error('Password does not match!');
      }
      const confirmedUser = {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        address: user.address
      }
  
      const jwtToken = jwt.sign({ user: confirmedUser }, secret_key, {
        expiresIn: 86000
      });
      return res.status(200).json({
        status: 'success',
        message: 'User has been logged in',
        token: `Bearer ${jwtToken}`,
        user: confirmedUser
      });
    } catch (err) {
      return res.status(200).json({
        status: 'failed',
        message: err.message,
      });
    }
  } 
}


export default UsersAuthenticationController;
