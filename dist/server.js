"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _routes = _interopRequireDefault(require("./routes/routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable linebreak-style */
// import cors from 'cors';
var app = (0, _express["default"])();
app.use(_bodyParser["default"].json({
  extended: true
}));
app.use(_bodyParser["default"].urlencoded({
  extended: true
})); // app.use(cors);

app.get('/', function (req, res) {
  res.json('Welcome to AutoMart');
});
app.use('/api/v1/', _routes["default"]);
app.use('*', function (req, res) {
  return res.status(404).json({
    status: 'Not Found',
    message: 'This route does not exist'
  });
});
var port = process.env.PORT || 3000;
app.listen(port, function () {
  return console.log('Welcome to Auto-Mart');
});
var _default = app;
exports["default"] = _default;