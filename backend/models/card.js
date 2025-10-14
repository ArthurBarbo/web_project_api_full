import mongoose from 'mongoose';

export const patternURL = /^https?:\/\/[^\s]+$/;

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return patternURL.test(v);
      },
      message: (props) => `${props.value} não é um link válido!`,
    },
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: [],
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Card', cardSchema);
