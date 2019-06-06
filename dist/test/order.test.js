"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _server = _interopRequireDefault(require("../server"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable consistent-return */

/* eslint-disable no-unused-vars */

/* eslint-disable no-undef */
_chai["default"].use(_chaiHttp["default"]);

var expect = _chai["default"].expect;
var orderDetails = {
  id: 1,
  buyer: 'Uzoamaka Anyanwu',
  car_id: 28,
  created_on: '21-30-2019',
  status: 'pending',
  price: 4500000,
  price_offered: 3500000
};
var updatedOrder = {
  price_offered: 3500000
};
var userDetails = {
  id: 1,
  email: "amaka@gmail.com",
  first_name: "Uzoamaka",
  last_name: "Anyanwu",
  password: "admin",
  address: "12, Gbagada Phase 1"
};
describe('Create an order', function () {
  it('/api/v1/order should return a 201 status code and create an order', function (done) {
    _chai["default"].request(_server["default"]).post('/api/v1/order').set('accept', 'application/json').send(orderDetails).end(function (err, res) {
      if (err) return done(err);
      expect(res.status).to.equal(201);
      expect(res.body.message).to.eql('Your order has been created successfully');
      done();
    });
  });
  it('/api/v1/order/:id should return a status code and retrieve a specific order', function (done) {
    var id = 1;

    _chai["default"].request(_server["default"]).get("/api/v1/order/".concat(id)).set('Accept', 'application/json').end(function (err, res) {
      if (err) return done(err);
      expect(res.status).to.equal(200);
      expect(res.body.message).to.eql('The order has been successfully retrieved');
      done();
    });
  });
  it('/api/v1/order/:id should respond with status code 201 and update the order', function (done) {
    _chai["default"].request(_server["default"]).patch("/api/v1/order/1").set('Accept', 'application/json').send(updatedOrder).end(function (err, res) {
      if (err) return done(err);
      expect(res.status).to.equal(201);
      expect(res.body.message).to.eql('The order has been updated successfully');
      done();
    });
  });
  it('/api/v1/order/:id/price should respond with status code 404 and and show order not found', function (done) {
    var id = 2;

    _chai["default"].request(_server["default"]).patch("/api/v1/order/".concat(id, "/price")).send({
      new_price_offered: 50000000
    }).set('Accept', 'application/json').end(function (err, res) {
      if (err) return done(err);
      expect(res.status).to.equal(404);
      done();
    });
  });
});