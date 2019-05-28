/* eslint-disable camelcase */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable quotes */
/* eslint-disable quote-props */
import data from '../models/data';

const createCar = (req, res) => {
  const newCar = {
    id: 1,
    owner: req.body.owner,
    created_on: req.body.created_on,
    state: req.body.state,
    status: req.body.status,
    price: req.body.price,
    manufacturer: req.body.manufacturer,
    model: req.body.model,
    body_type: req.body.body_type,
  };

  data.push(newCar);
  return res.status(201).json({
    status: 201,
    newCar,
  });
};

const getCar = (req, res) => {
  const id = parseInt(req.params.id, 10);
  data.map((car) => {
    if (car.id === id) {
      return res.status(200).send({
        success: 'true',
        message: 'Car data retrieval successful',
        car,
      });
    }
  });
};

const carStatus = (req, res) => {
  const { status } = req.query;
  const filtered = data.filter(car => car.status === status);
  if (filtered.length > 0) {
    return res.status(200).send({
      success: 'true',
      message: "Status of the car has been retrieved successfully",
      filtered,
    });
  }
  return res.status(400).send({
    success: 'false',
  });
};

// const priceRange = (req, res) => {
//   const { status, min_price, max_price } = req.query;
//   const filtered = data.filter(cars => cars.status === status);
//   if (filtered.length > 0) {
//     const filteredCars = filtered.filter(
//       cars => cars.price >= min_price && cars.price <= max_price,
//     );
//     return res.status(200).send({
//       success: 'true',
//       message: 'The price of the car has been retrieved successfully',
//       filteredCars,
//     });
//   }
//   return res.status(400).send({
//     success: 'false',
//   });
// };

const deleteCar = (req, res) => {
  const id = parseInt(req.params.id, 10);
  data.find((car, index) => {
    if (car.id === id) {
      data.splice(index, 1);
      return res.status(200).send({
        success: 'true',
        message: 'Car has been deleted successfully',
        data,
      });
    }
  });
  return res.status(404).send({
    success: 'false',
    message: 'Car does not exist',
  });
};

// const getAllCars = (req, res) => {
//   const id = parseInt(req.params.id, 10);
//   let findCar;
//   let carIndex;
//   data.map((car, index) => {
//     if (car.id === id) {
//       findCar = car;
//       carIndex = index;
//     }
//   });
//   if (!findCar) {
//     return res.status(404).send({
//       success: 'false',
//       message: 'Car does not exist',
//     });
//   }
//   const updateCarStatus = {
//     id: findCar.id,
//     created_on: findCar.created_on,
//     state: findCar.state,
//     status: req.body.status || findCar.status,
//     price: req.body.price || findCar.price,
//     manufacturer: findCar.manufacturer,
//     model: findCar.model,
//     body_type: findCar.body_type,
//   };

//   data.splice(carIndex, 1, updateCarStatus);
//   return res.status(201).send({
//     success: 'true',
//     message: 'Car has been updated successfully',
//     updateCarStatus,
//   });
// };

const CarController = {
  createCar,
  getCar,
  carStatus,
  deleteCar,
  // getAllCars,
  // updateCarStatus,
  // priceRange,
};

export default CarController;
