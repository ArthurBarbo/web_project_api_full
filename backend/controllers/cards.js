import Card from '../models/card.js';

export const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).json(cards))
    .catch((err) => res.status(500).json({ message: err.message }));
};

export const createCard = (req, res) => {
  const { name, link } = req.body;

  if (!name || !link) {
    return res.status(400).json({ message: 'Faltam campos obrigatórios' });
  }
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send(card))
    .catch((err) => res.status(400).send({ message: err.message }));
};

export const deleteById = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndDelete(cardId)
    .then((card) => {
      if (!card) return res.status(404).json({ message: 'Cartão não encontrado' });
      res.status(200).json({ message: 'Deletado com êxito', card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).json({ message: 'ID inválido' });
      }
      res.status(500).json({ message: err.message });
    });
};

export const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(404).json({ message: 'Cartão não encontrado' });
      }
      res.json(card);
    })
    .catch((err) => res.status(400).json({ message: err.message }));
};

export const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(404).json({ message: 'Cartão não foi encontrado' });
      }
      res.json(card);
    })
    .catch((err) => res.status(400).json({ message: err.message }));
};
