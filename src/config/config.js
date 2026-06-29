require('./env');

const environment = process.env.NODE_ENV || 'local';

const sharedConfig = {
  port: Number(process.env.PORT),
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
};

const environmentConfig = {
  local: {
    thirdPartyApiUrls: {
      paymentGateway: 'http://localhost:4100/api',
      shippingProvider: 'http://localhost:4200/api',
    },
  },
  staging: {
    thirdPartyApiUrls: {
      paymentGateway: 'https://staging-payments.example.com/api',
      shippingProvider: 'https://staging-shipping.example.com/api',
    },
  },
  production: {
    thirdPartyApiUrls: {
      paymentGateway: 'https://payments.example.com/api',
      shippingProvider: 'https://shipping.example.com/api',
    },
  },
};

module.exports = {
  environment,
  ...sharedConfig,
  ...environmentConfig[environment],
};
