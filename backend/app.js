/* eslint-disable no-unused-vars */
import 'dotenv/config';
import express from 'express';
import winston from 'winston';
import mongoose from 'mongoose';
import { errors } from 'celebrate';
import cors from 'cors';
import auth from './middlewares/auth.js';
import cards from './routes/cards.js';
import users from './routes/users.js';
import { validateLogin, validateCreateUser } from './middlewares/validation.js';
import { createUser, login } from './controllers/users.js';

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;

  res.header('Access-Control-Allow-Origin', '*');

  res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.header('Pragma', 'no-cache');
  res.header('Expires', '0');

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res.end();
  }

  next();
});

const requestLogger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'request.log' }),
  ],
});

const errorLogger = winston.createLogger({
  level: 'error',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log' }),
  ],
});

mongoose.connect(process.env.MONGO_URI, {});

app.use((req, res, next) => {
  requestLogger.info({
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
  });
  next();
});

const { PORT } = process.env;

app.post('/signin', validateLogin, login);
app.post('/signup', validateCreateUser, createUser);

app.use(auth);
app.use('/cards', cards);
app.use('/users', users);

app.use((req, res) => {
  res.status(404).json({ message: 'A solicitação não foi encontrada' });
});

app.use(errors());

app.use((err, req, res, next) => {
  errorLogger.error({
    timestamp: new Date().toISOString(),
    error: err.message,
    stack: err.stack,
    method: req.method,
    url: req.originalUrl,
    statusCode: err.statusCode || 500,
  });
  const { statusCode = 500, message } = err;
  res.status(statusCode).json({
    message: statusCode === 500 ? 'Erro interno do servidor' : message,
  });
});

app.listen(PORT, () => {
  console.log(`o Servidor está hospedado na porta: ${PORT}`);
});
