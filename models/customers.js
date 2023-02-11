const mongoose = require('mongoose');
const Joi = require('joi');

const customersShema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 250
  },
  lastName: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 250
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 250
  },
  phoneNumber: {
    type: Number,
    required: true,
    length: 10,
    unique: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

const Customer = mongoose.model('Customer', customersShema);

const customerValidation = (customer) => {
  const schema = {
    firstName: Joi.string().min(5).max(250).required(),
    lastName: Joi.string().min(5).max(250).required(),
    email: Joi.string().min(5).max(250).required(),
    phoneNumber: Joi.number().required(),
    createdBy: Joi.string(),
  }
  return Joi.validate(customer, schema);
}

exports.Customer = Customer;
exports.customerValidation = customerValidation;
