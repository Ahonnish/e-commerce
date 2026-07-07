import { env, environment, type RuntimeEnvironment } from './env';

type UrlConfig = {
  thirdPartyApiUrls: {
    paymentGateway: string;
    shippingProvider: string;
  };
};

const sharedConfig = {
  port: env.PORT,
  mongoUri: env.MONGO_URI,
  jwtSecret: env.JWT_SECRET,
  jwtExpiresIn: env.JWT_EXPIRES_IN,
  bcryptSaltRounds: env.BCRYPT_SALT_ROUNDS,
};

const environmentConfig: Record<RuntimeEnvironment, UrlConfig> = {
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

const config = {
  environment,
  ...sharedConfig,
  ...environmentConfig[environment],
};

export type AppConfig = typeof config;
export default config;
