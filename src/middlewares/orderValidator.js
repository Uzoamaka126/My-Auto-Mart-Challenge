const createOrderValidator = (req, res, next) => {

    if (req.body.status === 'pending' && req.body.buyer && req.body.price && req.body.price_offered ) {
     return next();
    } else {
        return res.status(406).json({
        status: 406,
        error: true,
        message: 'Please Enter All The Required Details',
    });
  }
};

const updateOrderValidator = (req, res, next) => {
  
  if (req.body.price_offered) {
    return next();
  } else {
    return res.status(406).json({
        status: 406,
        error: true,
        message: 'Please Enter Your New Price Offer',
      });
  }
};

const orderValidator = {
  createOrderValidator,
  updateOrderValidator,
};

export default orderValidator;
  