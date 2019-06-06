"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _server = _interopRequireDefault(require("../server"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-undef */
_chai["default"].use(_chaiHttp["default"]);

var expect = _chai["default"].expect;
var carDetails = {
  id: 1,
  owner: 'amaka',
  created_on: 'Wed May 21-30-2019',
  state: 'New',
  status: 'sold',
  price: 40000,
  manufacturer: 'Toyota',
  model: 'D-200',
  body_type: 'streamlined'
};
describe('CAR ENDPOINTS', function () {
  it('should return a 201 status code and post a car', function (done) {
    _chai["default"].request(_server["default"]).post('/api/v1/car').set('accept', 'application/json').send(carDetails).end(function (err, res) {
      if (err) return done(err);
      expect(res.status).to.equal(201);
      expect(res.body.message).to.eql('Car has been created successfully');
      done();
    });
  });
  it('should return a 200 status code and get a specific car', function (done) {
    _chai["default"].request(_server["default"]).get('/api/v1/car/1').set('accept', 'application/json').end(function (err, res) {
      if (err) return done(err);
      expect(res.status).to.equal(200);
      done();
    });
  });
  it('should return a 200 status code and get all cars', function (done) {
    _chai["default"].request(_server["default"]).get('/api/v1/car').set('accept', 'application/json').end(function (err, res) {
      if (err) return done(err);
      expect(res.status).to.equal(200);
      done();
    });
  });
  it('/api/v1/car?status=available should respond with status code 200 and get the status of all the cars', function (done) {
    // const status = available;
    _chai["default"].request(_server["default"]).get('/api/v1/car/?status=available').set('Accept', 'application/json') // eslint-disable-next-line consistent-return
    .end(function (err, res) {
      if (err) return done(err);
      expect(res.status).to.equal(200);
      expect(res.body.message).to.eql('Cars successfully retreived');
      done();
    });
  }); // For deleting a selected car

  it('should return a 201 status code and delete the specific car', function (done) {
    _chai["default"].request(_server["default"])["delete"]('/api/v1/car/1').set('accept', 'application/json').send(carDetails).end(function (err, res) {
      expect(res.status).to.eql(200);
      expect(res.body.message).to.eql('Car has been deleted successfully');
      done();
    });
  });
});