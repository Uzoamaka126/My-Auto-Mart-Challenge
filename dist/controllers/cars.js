"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _data = _interopRequireDefault(require("../models/data"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable camelcase */

/* eslint-disable consistent-return */

/* eslint-disable array-callback-return */

/* eslint-disable quotes */

/* eslint-disable quote-props */
var createCar = function createCar(req, res) {
  var newCar = {
    id: 1,
    owner: req.body.owner,
    created_on: req.body.created_on,
    state: req.body.state,
    status: req.body.status,
    price: req.body.price,
    manufacturer: req.body.manufacturer,
    model: req.body.model,
    body_type: req.body.body_type
  };

  _data["default"].push(newCar);

  return res.status(201).json({
    status: 201,
    message: 'Car has been created successfully',
    newCar: newCar
  });
};

var getCar = function getCar(req, res) {
  var id = parseInt(req.params.id, 10);

  var requestedCar = _data["default"].find(function (car) {
    return car.id === id;
  });

  if (!requestedCar) {
    return res.status(200).send({
      success: false,
      message: 'Car not found'
    });
  }

  return res.status(200).send({
    success: 'true',
    message: 'Car data retrieval successful',
    requestedCar: requestedCar
  });
};

var getAllCars = function getAllCars(req, res) {
  if (_data["default"].length === 0) {
    return res.status(200).json({
      status: 'success',
      message: 'No cars available'
    });
  }

  return res.status(200).json({
    status: 'success',
    message: 'Cars successfully retreived',
    data: _data["default"]
  });
};

var carStatus = function carStatus(req, res) {
  var status = req.query.status;

  var filtered = _data["default"].filter(function (car) {
    return car.status === 'blue';
  });

  if (filtered.length > 0) {
    return res.status(200).send({
      success: 'true',
      message: "Status of the car has been retrieved successfully",
      filtered: filtered
    });
  }

  return res.status(400).send({
    success: 'false'
  });
};

var priceRange = function priceRange(req, res) {
  var _req$query = req.query,
      status = _req$query.status,
      min_price = _req$query.min_price,
      max_price = _req$query.max_price;

  var filtered = _data["default"].filter(function (cars) {
    return cars.status === status;
  });

  if (filtered.length > 0) {
    var filteredCars = filtered.filter(function (cars) {
      return cars.price >= min_price && cars.price <= max_price;
    });
    return res.status(200).send({
      success: 'true',
      message: 'The price of the car has been retrieved successfully',
      filteredCars: filteredCars
    });
  }

  return res.status(400).send({
    success: 'false'
  });
};

var deleteCar = function deleteCar(req, res) {
  var id = parseInt(req.params.id, 10);

  _data["default"].find(function (car, index) {
    if (car.id === id) {
      _data["default"].splice(index, 1);

      return res.status(200).send({
        success: 'true',
        message: 'Car has been deleted successfully',
        data: _data["default"]
      });
    }

    return res.status(404).send({
      success: 'false',
      message: 'Car does not exist'
    });
  });
};

var updateCarStatus = function updateCarStatus(req, res) {
  var id = req.params.id; // const very = parseInt(req.params.id, 10);

  var findCar = _data["default"].find(function (car) {
    return car.id === parseInt(id, 10);
  });

  if (!findCar) {
    return res.status(404).json({
      status: 'failure',
      message: 'car not found'
    });
  }

  if (findCar.status === 'sold') {
    return res.status(400).json({
      status: 'failure',
      message: 'car has already been sold'
    });
  }

  findCar.status = 'sold';
  return res.status(404).json({
    status: 'failure',
    message: 'car status successfully changed'
  });
};

var CarController = {
  createCar: createCar,
  getCar: getCar,
  // carStatus,
  deleteCar: deleteCar,
  getAllCars: getAllCars,
  updateCarStatus: updateCarStatus
};
var _default = CarController;
exports["default"] = _default;