import express from 'express';
import Cars from '../controllers/cars';
import Users from '../controllers/user';
import Orders from '../controllers/order';
import orderValidator from '../middlewares/orderValidator';
import carValidator from '../middlewares/carValidator'
import userValidator from '../middlewares/userValidator';

const router = express.Router();

const { createCar, getCar, getAllCars, deleteCar, updateCarStatus } = Cars;
const { createOrder, getOrder, updateOrder } = Orders;
const { createUsers } = Users;

const { createOrderValidator } = orderValidator;
const { updateOrderValidator } = orderValidator;
const { statusValidator } = carValidator;
const { postValidator } = carValidator;

const { signInValidator } = userValidator;
const { signUpValidator } = userValidator;

router.post('/car', postValidator, createCar);
router.get('/car/:id', getCar);
router.post('/auth/signup', signUpValidator, createUsers);
router.post('/auth/signin', signInValidator, Users.signIn);
// router.get('/car/status', carStatus);
router.get('/car', getAllCars);
router.get('/order/:id', getOrder);
router.delete('/car/:id', deleteCar);
router.patch('/car/:id', statusValidator, updateCarStatus);
router.post('/order', createOrderValidator, createOrder);
router.patch('/order/:id', updateOrderValidator, updateOrder);

export default router;
