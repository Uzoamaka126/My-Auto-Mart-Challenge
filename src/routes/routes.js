import express from 'express';
import car from '../controllers/cars';
import Users from '../controllers/user';

const router = express.Router();

router.post('/car', car.createCar);
router.get('/car/:id', car.getCar);
router.post('/auth/signup', Users.createUsers);
// router.get('/car', car.getAllCars);
router.get('/car', car.carStatus);
router.delete('/car/:id', car.deleteCar);
// router.patch('/car/:id', car.updateStatus);
// router.post('/order', order.createOrder);
// router.get('/order/:id', order.getOrder);
// router.patch('/order/:id', order.updateOrder);

export default router;
