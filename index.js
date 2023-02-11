const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/practice-app')
  .then(() => console.log('Mongodb connection is successful'))
  .catch(() => console.log('Error in connecting to mongodb'));

const app = express();

app.get('/', (req, res) => {
  res.send("we are creating practice app");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Listing on port 3000"));
