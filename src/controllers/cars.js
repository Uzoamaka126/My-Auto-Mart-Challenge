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
    message: 'Car has been created successfully',
    newCar,
  });
};

const getCar = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const requestedCar = data.find(car => car.id === id);
  if (!requestedCar) {
    return res.status(200).send({
      success: false,
      message: 'Car not found',
    });
  }
  return res.status(200).send({
    success: 'true',
    message: 'Car data retrieval successful',
    requestedCar,
  });
};

const getAllCars = (req, res) => {
  if (data.length === 0) {
    return res.status(200).json({
      status: 'success',
      message: 'No cars available',
    });
  }
  return res.status(200).json({
    status: 'success',
    message: 'Cars successfully retreived',
    data,
  });
};

const carStatus = (req, res) => {
  const { status } = req.query;
  const filtered = data.filter(car => car.status === 'blue');
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

const priceRange = (req, res) => {
  const { status, min_price, max_price } = req.query;
  const filtered = data.filter(cars => cars.status === status);
  if (filtered.length > 0) {
    const filteredCars = filtered.filter(
      cars => cars.price >= min_price && cars.price <= max_price,
    );
    return res.status(200).send({
      success: 'true',
      message: 'The price of the car has been retrieved successfully',
      filteredCars,
    });
  }
  return res.status(400).send({
    success: 'false',
  });
};

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
    return res.status(404).send({
      success: 'false',
      message: 'Car does not exist',
    });
  });
};

const updateCarStatus = (req, res) => {
  const { id } = req.params;
  // const very = parseInt(req.params.id, 10);
  const findCar = data.find(car => car.id === parseInt(id, 10));
  if (!findCar) {
    return res.status(404).json({
      status: 'failure',
      message: 'car not found',
    });
  }
  if (findCar.status === 'sold') {
    return res.status(400).json({
      status: 'failure',
      message: 'car has already been sold',
    });
  }
  findCar.status = 'sold';
  return res.status(404).json({
    status: 'failure',
    message: 'car status successfully changed',
  });
};

const CarController = {
  createCar,
  getCar,
  // carStatus,
  deleteCar,
  getAllCars,
  updateCarStatus,
};

export default CarController;
