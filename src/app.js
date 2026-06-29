const express = require('express');
const healthRouter = require('./routes/health.routes');
const authRoutes = require('./routes/auth.routes');
const errorHandler = require('./middlewares/error.middleware');
const sendResponse = require('./utils/response.handler');

const app = express();

app.use(express.json()); // middleware

app.use('/api', healthRouter);
app.use('/api/auth', authRoutes);

app.use(sendResponse);
// centralized error middleware
app.use(errorHandler);

module.exports = app;
