const getHealth = (req, res, next) => {
  res.locals.response = {
    code: 'HEALTH_CHECK_SUCCESS',
    data: {
      timestamp: new Date().toISOString(),
    },
  };

  return next();
};

module.exports = { getHealth };
