import mongoose from 'mongoose';
import { patternURL } from './card.js';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return patternURL.test(v);
      },
      message: (props) => `${props.value} não é um link válido!`,
    },
  },
});

export default mongoose.model('User', userSchema);
