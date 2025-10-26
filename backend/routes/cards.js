import { Router } from 'express';
import { validateCreateCard, validateId } from '../middlewares/validation.js';
import {
  createCard,
  deleteById,
  dislikeCard,
  getCards,
  likeCard,
} from '../controllers/cards.js';

const router = Router();

router.get('/', getCards);

router.delete('/:cardId', validateId, deleteById);

router.put('/:cardId/likes', validateId, likeCard);

router.delete('/:cardId/likes', validateId, dislikeCard);

router.post('/', validateCreateCard, createCard);
export default router;
