import app from './app';
import config from './config/config';
import connectDB from './database';
import logger from './utils/logger';

void connectDB();

const PORT = config.port;

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
