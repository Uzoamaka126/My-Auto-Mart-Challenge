"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var createOrderValidator = function createOrderValidator(req, res, next) {
  if (req.body.status === 'pending' && req.body.buyer && req.body.price && req.body.price_offered) {
    return next();
  } else {
    return res.status(406).json({
      status: 406,
      error: true,
      message: 'Please Enter All The Required Details'
    });
  }
};

var updateOrderValidator = function updateOrderValidator(req, res, next) {
  if (req.body.price_offered) {
    return next();
  } else {
    return res.status(406).json({
      status: 406,
      error: true,
      message: 'Please Enter Your New Price Offer'
    });
  }
};

var orderValidator = {
  createOrderValidator: createOrderValidator,
  updateOrderValidator: updateOrderValidator
};
var _default = orderValidator;
exports["default"] = _default;