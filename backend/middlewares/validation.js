import { celebrate, Joi } from 'celebrate';
import validator from 'validator';

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
};

export const validateCreateUser = celebrate({
  body: Joi.object({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(validateURL),
    email: Joi.string().email().required(),
    password: Joi.string().required(),

  }),
});

export const validateLogin = celebrate({
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

export const validateCreateCard = celebrate({
  body: Joi.object({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(validateURL),
  }),
});
export const validateUpdateAvatar = celebrate({
  body: Joi.object({
    avatar: Joi.string().required().custom(validateURL),
  }),
});
export const validateUpdateUser = celebrate({
  body: Joi.object({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

export const validateId = celebrate({
  params: Joi.object({
    cardId: Joi.string().hex().length(24).required(),
  }),
});
