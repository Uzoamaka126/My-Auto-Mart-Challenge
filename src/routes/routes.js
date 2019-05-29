import express from 'express';
import car from '../controllers/cars';
import Users from '../controllers/user';
import Orders from '../controllers/order';

const router = express.Router();

router.post('/car', car.createCar);
router.get('/car/:id', car.getCar);
// router.post('/auth/signup', Users.createUsers);
// router.get('/car', car.getAllCars);
router.get('/car', car.carStatus);
router.delete('/car/:id', car.deleteCar);
// router.patch('/car/:id', car.updateStatus);
router.post('/order', Orders.createOrder);
router.get('/order/:id', Orders.getOrder);
// router.patch('/order/:id', Orders.updateOrder);

export default router;
