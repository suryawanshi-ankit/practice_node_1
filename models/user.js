const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },

  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 250,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 1024,
  }
});

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({_id: this.id}, config.get('jwtPrivateKey'));
  return token;
}

const User = mongoose.model('User', userSchema);

const userValidation = (user) => {
  schema = {
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(250).required(),
    password: Joi.required(),
  }
  return Joi.validate(user, schema);
};

exports.User = User;
exports.userValidation = userValidation;
