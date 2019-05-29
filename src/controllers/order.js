/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import orderData from '../models/orderData';

const createOrder = (req, res) => {
  const newOrder = {
    id: 200,
    buyer: req.body.buyer,
    car_id: req.body.car_id,
    created_on: req.body.created_on,
    status: req.body.status,
    price: req.body.price,
    price_offered: req.body.price_offered,
  };

  orderData.push(newOrder);
  return res.status(201).json({
    status: 201,
    message: 'Your order has been created successfully',
    newOrder,
  });
};

const getOrder = (req, res) => {
  const id = parseInt(req.params.id, 10);
  orderData.map((order) => {
    if (order.id === id) {
      return res.status(200).send({
        success: 'true',
        message: 'The order has been successfully retrieved',
        order,
      });
    }
  });
};

// const updateOrder = (req, res) => {
//   const id = parseInt(req.params.id, 10);
//   let findOrder;
//   let orderIndex;
//   orderData.find((order, index) => {
//     if (order.id === id) {
//       findOrder = order;
//       orderIndex = index;
//     }
//   });
//   if (!findOrder) {
//     return res.status(404).send({
//       success: 'false',
//       message: 'This order does not exist',
//     });
//   }


//   const updatedOrder = {
//     id: findOrder.id,
//     car_id: findOrder.car_id,
//     status: findOrder.status,
//     old_price_offered: findOrder.price_offered,
//     new_price_offered: req.body.price_offered || findOrder.price_offered,
//   };
//   orderData.splice(orderIndex, 1, updatedOrder);
//   return res.status(201).send({
//     success: 'true',
//     message: 'The order has been updated successfully',
//     updatedOrder,
//   });
// };

const orderController = {
  createOrder,
  getOrder,
//   updateOrder,
};

export default orderController;
