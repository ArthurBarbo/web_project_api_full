import { Router } from 'express';
import { validateId, validateUpdateAvatar, validateUpdateUser} from '../middlewares/validation.js';
import {
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
  getCurrentUser,
} from '../controllers/users.js';

const router = Router();

router.get('/', getUsers);

router.get('/me', getCurrentUser);

router.get('/:userId', validateId, getUserById);

router.patch('/me', validateUpdateUser, updateUser);

router.patch('/me/avatar', validateUpdateAvatar, updateAvatar);

export default router;
