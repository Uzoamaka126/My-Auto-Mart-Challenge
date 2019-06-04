import express from 'express';
import car from '../controllers/cars';
import Users from '../controllers/user';
import Orders from '../controllers/order';

const router = express.Router();

const {createCar, getCar, getAllCars, carStatus, deleteCar, updateStatus} = car;
const {createOrder, getOrder, updateOrder} = Orders;
const {createUsers } = Users;

router.post('/car', createCar);
// router.get('/car/:id', getCar);
router.post('/auth/signup', createUsers);
// router.get('/car', getAllCars);
// router.get('/car', carStatus);
router.delete('/car/:id', deleteCar);
// router.patch('/car/:id', updateStatus);
router.post('/order', createOrder);
// router.get('/order/:id', getOrder);
// router.patch('/order/:id', updateOrder);

export default router;
