import mongoose from 'mongoose';
import validator from 'validator';
import { patternURL } from './card.js';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Jacques Cousteau'
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Explorer'
  },
  avatar: {
    type: String,
    default: "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
    validate: {
      validator(v) {
        return patternURL.test(v);
      },
      message: (props) => `${props.value} não é um link válido!`,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate:{
      validator: validator.isEmail,
    message: "Email inválido"
  }
},
password: {
  type:String,
  required:true,
  select:false 
},
});

export default mongoose.model('User', userSchema);
