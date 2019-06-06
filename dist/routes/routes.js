"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _cars = _interopRequireDefault(require("../controllers/cars"));

var _user = _interopRequireDefault(require("../controllers/user"));

var _order = _interopRequireDefault(require("../controllers/order"));

var _orderValidator = _interopRequireDefault(require("../middlewares/orderValidator"));

var _carValidator = _interopRequireDefault(require("../middlewares/carValidator"));

var _userValidator = _interopRequireDefault(require("../middlewares/userValidator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

var createCar = _cars["default"].createCar,
    getCar = _cars["default"].getCar,
    getAllCars = _cars["default"].getAllCars,
    deleteCar = _cars["default"].deleteCar,
    updateCarStatus = _cars["default"].updateCarStatus;
var createOrder = _order["default"].createOrder,
    getOrder = _order["default"].getOrder,
    updateOrder = _order["default"].updateOrder;
var createUsers = _user["default"].createUsers;
var createOrderValidator = _orderValidator["default"].createOrderValidator;
var updateOrderValidator = _orderValidator["default"].updateOrderValidator;
var statusValidator = _carValidator["default"].statusValidator;
var postValidator = _carValidator["default"].postValidator;
var signInValidator = _userValidator["default"].signInValidator;
var signUpValidator = _userValidator["default"].signUpValidator;
router.post('/car', postValidator, createCar);
router.get('/car/:id', getCar);
router.post('/auth/signup', signUpValidator, createUsers);
router.post('/auth/signin', signInValidator, _user["default"].signIn); // router.get('/car/status', carStatus);

router.get('/car', getAllCars);
router.get('/order/:id', getOrder);
router["delete"]('/car/:id', deleteCar);
router.patch('/car/:id', statusValidator, updateCarStatus);
router.post('/order', createOrderValidator, createOrder);
router.patch('/order/:id', updateOrderValidator, updateOrder);
var _default = router;
exports["default"] = _default;