"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _server = _interopRequireDefault(require("../server"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_chai["default"].use(_chaiHttp["default"]);

var expect = _chai["default"].expect;
var userDetails = {
  id: 100,
  email: 'amaka@gmail.com',
  first_name: 'Uzoamaka',
  last_name: 'Peter',
  password: 'admin',
  address: '12 Gbagada'
};
describe('Sign up test for the User', function () {
  it('/api/v1/auth/signup should respond with status code 201 and create a User', function (done) {
    _chai["default"].request(_server["default"]).post('/api/v1/auth/signup').set('Accept', 'application/json').send(userDetails).end(function (err, res) {
      if (err) return done(err);
      expect(res.status).to.equal(201);
      expect(res.body.message).to.eql('User has been successfully created');
      done();
    });
  });
  it('/api/v1/auth/signin should respond with status code 201 and login a User', function (done) {
    _chai["default"].request(_server["default"]).post('/api/v1/auth/signin').set('Accept', 'application/json').send(userDetails).end(function (err, res) {
      if (err) return done(err);
      expect(res.status).to.equal(201);
      expect(res.body.message).to.eql('User has logged in successfully');
      done();
    });
  });
});