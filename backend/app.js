import express from 'express';
import mongoose from 'mongoose';
import { errors } from 'celebrate';
import auth from './middlewares/auth.js';
import cards from './routes/cards.js';
import users from './routes/users.js';
import { validateLogin, validateCreateUser } from './middlewares/validation.js';
import { createUser, login } from './controllers/users.js';

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URL, {});

// eslint-disable-next-line no-unused-vars
const PORT = process.env.PORT;

app.post('/signin', validateLogin, login);
app.post('/signup', validateCreateUser , createUser);


app.use(auth);
app.use('/cards', cards);
app.use('/users', users);


app.use((req, res) => {
  res.status(404).json({ message: 'A solicitação não foi encontrada' });
});

app.use(errors());

app.use((err, req, res, next) =>{
  const {statusCode=500, message} =err;
  res.status(statusCode).json({
    message: statusCode===500 ? 'Erro interno do servidor': message
  });
});

app.listen(PORT, () => {
  console.log(`o Servidor está hospedado na porta: ${PORT}`);
});
