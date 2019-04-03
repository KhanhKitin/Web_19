const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRouter = require('./api/users/routes');
const postRouter = require('./api/posts/routes');
const authRouter = require('./api/auth/routes');
const registerRouter = require('./public/routes');
const expressSession = require('express-session');

mongoose.connect("mongodb://localhost:27017/techkids-hotgirl", err => {
  if (err) {
    throw err;
  }
  const app = express();

  console.log("Connect to MongoDB success");
  // middlewares
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(expressSession({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
  }));
  // routes
  app.use('/api/users', userRouter);
  app.use('/api/posts', postRouter);
  app.use('/api/auth', authRouter);
  app.use('/api/auth', registerRouter);




  // start server
  app.listen(3000, error => {
    if (error) {
      throw error;
    }
    console.log("Server listen on port 3000...");
  });
});
