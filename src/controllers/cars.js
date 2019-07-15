/* eslint-disable camelcase */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable quotes */
/* eslint-disable quote-props */
import carData from '../models/carData';

const createCar = (req, res) => {
  const newCar = {
    owner: req.body.owner,
    created_on: req.body.created_on,
    state: req.body.state,
    status: req.body.status,
    price: req.body.price,
    manufacturer: req.body.manufacturer,
    model: req.body.model,
    body_type: req.body.body_type,
  };

  carData.push(newCar);
  return res.status(201).json({
    status: 201,
    message: 'Car has been created successfully',
    newCar,
  });
};

// Retrieve a specific car
const getCar = (req, res) => {
  const id = parseInt(req.params.id, 10);
  carData.getSingleCar(id).then((value) => {
    const result = value.rows;
    return res.status(200).json({
      status: 'success',
      message: 'Here is your car',
      result,
    });
  });
};

// Retrieve all cars 
const getAllCars = (req, res) => {
  if ('state' in req.query){
    carStatusAndState(req, res);
  } else if ('status' in req.query) {
    carStatus(req, res);
  } else if ('body_type' in req.query) {
    carBodyType(req, res);
  } else {
    carData.getAllCars()
    .then((value) =>{
      let result = value.rows;
      return res.status(200).send({
        status: 'success',
        message: 'The status and state of the car has been retrieved successfully',
        result
      });
    })
    
  }
};

// Retrieve the status of the car
const carStatus = (req, res) => {
  const { status } = req.query;
  carData.getCarStatus(status).then((values) => {
    if (values.rows.length > 0) {
      const result = values.rows;
      return res.status(200).send({
        success: 'true',
        message: "The status and state of the car has been retrieved successfully",
        data : result,
      });
    }
    return res.status(400).send({
      status: 'false',
    });
  });
};

// Retrieve the body type of the car
const carBodyType = (req, res) => {
  const { body_type } = req.query;
  carData.getCarBodyType(body_type).then((values) => {
    if (values.rows.length > 0) {
      const result = values.rows;
      return res.status(200).json({
        status: 'true',
        message: "The specified body type of the car has been retrieved successfully",
        data: result,
      });
    }
    return res.status(404).send({
      status: 'false',
      message: "This body type does not exist",
    });
  });  
};

// Retrieve all cars based on whether they are available and used or available and new
const carStatusAndState = (req, res) => {
  const { status, state } = req.query;
  carData.getCarStatusAndState(status, state).then((values) => {
    console.log(values)
    if (values.rows.length > 0) {
      const result = values.rows;
      return res.status(200).send({
        status: 'success',
        message: 'The status and state of the car has been retrieved successfully',
        data: result,
      });
    }
    return res.status(400).send({
      success: 'false',
    });
  });
};

// Retrieve all cars based on whether they are available and from a selected manufacturer
const carStatusAndManufacturer = (req, res) => {
  const { status, state, manufacturer } = req.query;
  carData.getCarStatusAndManufacturer(status, state, manufacturer).then((values) => {
    if (values.rows.length > 0) {
      const result = values.rows;
      return res.status(200).send({
        success: 'true',
        message: 'The status and state of the car has been retrieved successfully',
        data: result,
      });
    }
    return res.status(400).send({
      status: 'false',
    });
  });  
};

// Retrieve all cars based on a specified price range
const priceRange = (req, res) => {
  const { min_price, max_price } = req.query;
  carData.getPriceRange(min_price, max_price).then((values) => {
    if (values.rows.length > 0) {
      const result = values.rows;
      return res.status(200).send({
        success: 'true',
        message: 'Here is the price for so and so car',
        data: result,
      });
    }
    return res.status(404).send({
      success: 'failed',
      message: 'Such prices does not exist',
    })
  });
};

// Delete a specified car
const deleteCar = (req, res) => {
  const id = parseInt(req.params.id, 10);
  carData.deleteSingleCar(id).then((value) => {
    const result = value.rows;
    return res.status(200).json({
      status: 'success',
      message: 'Car has been deleted successfully',
      result,
    });
  });
};

// Update the status of a specified car
const updateCarStatus = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { status } = req.body;
  console.log(status)
  const car = carData.getSingleCar(id).then((values) => {
    const singleCar = values.rows
    if(singleCar.length > 0){
      carData.updateCarStatus(id, status).then((value) => {
        const result = value.rows;
        return res.status(200).json({
          status: 'success',
          message: 'car status successfully changed',
          result,
        });
      }).catch(error => res.status(400).json({
        status: 400,
        error: error.message,
      }));
    }
    else{
      res.status(400).json({
        status: 400,
        error: 'car not found',
      });
    }   
  })
};

const CarController = {
  createCar,
  getCar,
  carStatus,
  carStatusAndManufacturer,
  carStatusAndState,
  carBodyType,
  deleteCar,
  getAllCars,
  priceRange,
  updateCarStatus,
};

export default CarController;
