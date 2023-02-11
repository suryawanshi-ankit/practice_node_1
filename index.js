const express = require('express');
const mongoose = require('mongoose');
const user = require('./routes/user');

mongoose.connect('mongodb://localhost/practice-app')
  .then(() => console.log('Mongodb connection is successful'))
  .catch(() => console.log('Error in connecting to mongodb'));

const app = express();
app.use(express.json())
app.use('/api/user', user);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Listing on port 3000"));
