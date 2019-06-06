"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _orderData = _interopRequireDefault(require("../models/orderData"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable consistent-return */

/* eslint-disable array-callback-return */

/* eslint-disable no-unused-vars */
var createOrder = function createOrder(req, res) {
  var newOrder = {
    id: 200,
    buyer: req.body.buyer,
    car_id: req.body.car_id,
    created_on: req.body.created_on,
    status: req.body.status,
    price: req.body.price,
    price_offered: req.body.price_offered
  };

  _orderData["default"].push(newOrder);

  return res.status(201).json({
    status: 201,
    message: 'Your order has been created successfully',
    newOrder: newOrder
  });
};

var getOrder = function getOrder(req, res) {
  var id = parseInt(req.params.id, 10);

  var requestedOrder = _orderData["default"].find(function (order) {
    return order.id === id;
  });

  return res.status(200).send({
    success: 'true',
    message: 'The order has been successfully retrieved',
    requestedOrder: requestedOrder
  });
};

var updateOrder = function updateOrder(req, res) {
  var id = parseInt(req.params.id, 10);

  var foundOrder = _orderData["default"].find(function (order) {
    return order.id === id;
  });

  if (!foundOrder) {
    return res.status(404).send({
      success: 'false',
      message: 'This order does not exist'
    });
  }

  foundOrder.old_offer = foundOrder.current_offer;
  foundOrder.current_offer = req.body.price_offered;
  return res.status(201).send({
    success: 'true',
    message: 'The order has been updated successfully',
    foundOrder: foundOrder
  });
};

var orderController = {
  createOrder: createOrder,
  getOrder: getOrder,
  updateOrder: updateOrder
};
var _default = orderController;
exports["default"] = _default;