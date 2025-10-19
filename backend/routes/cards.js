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

router.delete('/:cardId', deleteById);

router.post('/', createCard);

router.put('/:cardId/likes', likeCard);

router.delete('/:cardId/likes', dislikeCard);

export default router;
