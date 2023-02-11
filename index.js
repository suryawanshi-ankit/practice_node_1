const express = require('express');
const mongoose = require('mongoose');
const user = require('./routes/user');
const customers = require('./routes/customers'); 
const config = require('config');

if(!config.get('jwtPrivateKey')) {
  console.log('FATAL ERROR: jwtPrivateKey is not provided!!!')
  process.exit(1);
}

mongoose.connect('mongodb://localhost/practice-app')
  .then(() => console.log('Mongodb connection is successful'))
  .catch(() => console.log('Error in connecting to mongodb'));

const app = express();
app.use(express.json())
app.use('/api/user', user);
app.use('/api/customers', customers);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Listing on port 3000"));
