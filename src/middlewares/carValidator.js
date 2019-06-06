const statusValidator = (req, res, next) => {

  if (req.body.status.toLowerCase() !== 'sold' || req.body.status.toLowerCase() !== 'available') {
    return res.status(400).json({
      error: true,
      message: 'Status should be sold or available',
    });
  }
  return next();
};

const postValidator = (req, res, next) => {
  
  if (!req.body.price && !req.body.owner && !req.body.manufacturer) {
    return res.status(412).json({
      status: 412,
      error: 'Wrong post format. Try Again!',
      message: 'Wrong post format. Try Again!',
    });
  }
  next();
};

const carValidator = {
  statusValidator,
  postValidator,
};

export default carValidator;
