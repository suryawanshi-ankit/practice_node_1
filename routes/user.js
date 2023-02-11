const { User, userValidation} = require('../models/user');
const express = require('express');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const router = express.Router();
const asyncTryCatchMiddleware = require('../middleware/errror');

router.get('/', asyncTryCatchMiddleware(async (req, res) => {
  const users = await User.find()
  res.status(200).send(users);
}));

router.post('/', asyncTryCatchMiddleware(async (req, res) => {
  const {error } = userValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({email: req.body.email})
  if (user) return res.status(400).send("User already present");

  user = new User(_.pick(req.body, ['name', 'email', 'password']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save()

  const token = user.generateAuthToken();
  res.header('x-auth-token', token).status(200).send(_.pick(user, ['name', 'email']));
}));

module.exports = router;
