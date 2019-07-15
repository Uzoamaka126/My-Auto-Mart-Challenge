/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import orderData from '../models/orderData';

const createOrder = (req, res) => {
  const new_order = {
    buyer: req.body.buyer,
    car_id: req.body.car_id,
    created_on: req.body.created_on,
    status: req.body.status,
    price: req.body.price,
    price_offered: req.body.price_offered,
  };

  orderData.createNewOrder(new_order);
  return res.status(201).json({
    status: 201,
    message: 'Your order has been created successfully',
    data: new_order,
  });
};

const getOrder = (req, res) => {
  const id = parseInt(req.params.id, 10);
  orderData.getSingleOrder(id).then((value) => {
    const result = value.rows;
    return res.status(200).send({
      success: 'true',
      message: 'The order has been successfully retrieved',
      result,
    });
  })
};

const updateOrder = (req, res) => {
  const id = parseInt(req.params.id, 10);

  const { price_offered } = req.body;
  orderData.getSingleOrder(id).then((result) => {
    const order = result.rows;
    if (order.length > 0) {
      const oldPrice = (order[0].new_price_offered === null ? order[0].price_offered : order[0].new_price_offered);      console.log(oldPrice);
      orderData.updateSingleOrder(id, oldPrice, price_offered).then(() => {
        const value = results.rows;
        return res.status(201).send({
          success: 'true',
          message: 'The order has been successfully updated',
          data: value,
        })
      })
    }
  })
 
  return res.status(201).send({
    success: 'true',
    message: 'The order has been updated successfully',
    foundOrder,
  });
};

const orderController = {
  createOrder,
  getOrder,
  updateOrder,
};

export default orderController;
