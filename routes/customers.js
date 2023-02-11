const { Customer, customerValidation} = require('../models/customers');
const auth = require('../middleware/auth');
const express = require('express');
const _ = require('lodash');

const router = express.Router();

router.get('/', auth, async(req, res) => {
  const customer = await Customer.find();
  res.status(200).send(customer);

});

router.post('/', auth, async(req, res) => {

  const { error } = customerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);


  let customer = await Customer.findOne({email: req.body.email});
  if (customer) return res.status(400).send("Customer already present");

  customer = await new Customer({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    createdBy: req.user._id
  })
  customer.save();
  res.status(200).send(customer);

});

router.delete('/:id', auth, async(req, res) => {

  let customer = await Customer.findByIdAndDelete({_id: req.params.id});
  if (!customer) return res.status(400).send("Customer not Present with given id");

  res.status(200).send(customer);

});

router.patch('/:id', auth, async(req, res) => {

  let customer = await Customer.findByIdAndUpdate({_id: req.params.id}, {
    $set: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      createdBy: req.user._id
    }
  }, {new: true});
  if (!customer) return res.status(400).send("Customer not Present with given id");

  res.status(200).send(customer);

});

module.exports = router;
