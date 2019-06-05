const statusValidator = (req, res, next) => {
  const { status } = req.query;
  if (status.toLowerCase() !== 'sold' || status.toLowerCase() !== 'available') {
    return res.status(400).json({
      error: true,
      message: 'Status should be sold or available',
    });
  }
  return next();
};

export default statusValidator;
