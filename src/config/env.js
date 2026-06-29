const logger = require('../utils/logger');

const allowedEnvironments = ['local', 'staging', 'production'];

const environment = process.env.NODE_ENV || 'local';

if (!allowedEnvironments.includes(environment)) {
  throw new Error(
    `Invalid NODE_ENV: ${environment}. Allowed values are: ${allowedEnvironments.join(', ')}`
  );
}

const requiredVariables = ['PORT', 'MONGO_URI', 'JWT_SECRET'];

requiredVariables.forEach((variable) => {
  if (!process.env[variable]) {
    throw new Error(`Missing required environment variable: ${variable}`);
  }
});

logger.info(`Environment loaded: ${environment}`);

module.exports = { environment };
