import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import 'dotenv/config';

export const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => res.status(500).send({ message: err.message }));
};

export const getUserById = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      if (!user) return res.status(404).send({ message: 'usuário não encontrado' });
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') return res.status(400).send({ message: 'ID inválido' });
      res.status(500).send({ message: err.message });
    });
};

export const getCurrentUser = (req, res, next) => {
  const userId = req.user._id;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'usuário não encontrado' });
      }
      res.json({ data: user });
    })
    .catch(next);
};

export const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: 'Email ou senha não encontrados' });
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return res.status(401).json({ message: 'Email ou senha não encontrados' });
          }

          const token = jwt.sign(
            { _id: user._id },
            process.env.JWT_SECRET || 'dev-secret-key',
            { expiresIn: '7d' },
          );
          res.send({ token });
        });
    })
    .catch(next);
};
export const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Faltam campos obrigatórios' });
  }
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.status(201).send(user))
    .catch(next);
};

export const updateUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
      res.json(user);
    })
    .catch((err) => res.status(400).json({ message: err.message }));
};

export const updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
      res.json(user);
    })
    .catch((err) => res.status(400).json({ message: err.message }));
};
