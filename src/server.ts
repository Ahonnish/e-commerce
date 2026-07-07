import app from './app';
import config from './config/config';
import connectDB from './database';
import logger from './utils/logger';

const PORT = config.port;

const startServer = async (): Promise<void> => {
  await connectDB();

  app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
  });
};

void startServer();
