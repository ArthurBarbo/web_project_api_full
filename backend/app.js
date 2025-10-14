import express from 'express';
import mongoose from 'mongoose';
import cards from './routes/cards.js';
import users from './routes/users.js';

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/aroundb', {});

// eslint-disable-next-line no-unused-vars
const PORT = process.env.PORT || 3000;
app.use((req, res, next) => {
  req.user = {
    _id: '68d1a7c67f1a6be84dff5bee',
  };

  next();
});

app.use('/cards', cards);
app.use('/users', users);

app.use((req, res) => {
  res.status(404).json({ message: 'A solicitação não foi encontrada' });
});

app.listen(PORT, () => {
  console.log(`o Servidor está hospedado na porta: ${PORT}`);
});

// eslint-disable-next-line no-unused-vars
export const createCard = (req, res) => {
  console.log(req.user._id);
};
