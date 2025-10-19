import express from 'express';
import mongoose from 'mongoose';
import auth from './middlewares/auth.js';
import cards from './routes/cards.js';
import users from './routes/users.js';
import { createUser, login } from './controllers/users.js';

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URL, {});

// eslint-disable-next-line no-unused-vars
const PORT = process.env.PORT;

app.post('/signin', login);
app.post('/signup', createUser);


app.use(auth);
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
