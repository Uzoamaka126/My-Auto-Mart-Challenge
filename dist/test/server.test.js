"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _server = _interopRequireDefault(require("../server"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-undef */
_chai["default"].use(_chaiHttp["default"]);

var expect = _chai["default"].expect;
describe('BASE ENDPOINT', function () {
  it('should return a 200 status code', function (done) {
    _chai["default"].request(_server["default"]).get('/').set('accept', 'application/json').end(function (err, res) {
      expect(res.status).to.eql(200);
      expect(res.body).to.eql('Welcome to AutoMart');
      done();
    });
  });
});