import express from 'express';
import healthRouter from './routes/health.routes';
import authRoutes from './routes/auth.routes';
import errorHandler from './middlewares/error.middleware';
import sendResponse from './utils/response.handler';

const app = express();

app.use(express.json()); // middleware

app.use('/api', healthRouter);
app.use('/api/auth', authRoutes);

app.use(sendResponse);
// centralized error middleware
app.use(errorHandler);

export default app;
