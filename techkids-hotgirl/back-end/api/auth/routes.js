const express = require("express");
const brcyptjs = require("bcryptjs");
const bodyParser = require("body-parser");
const UserModel = require("../users/models");

const authRouter = express();
authRouter.use(bodyParser.json());
authRouter.use(bodyParser.urlencoded({ extended: false }));
//register

authRouter.post("/register", async (req, res) => {
  try {
    const userInfo = req.body;
    console.log(userInfo.password);
    //check email/ password/ firstName/ lastName empty
    // check email exist
    // check password regex
    const hashPassword = await brcyptjs.hash(userInfo.password, 10);
    const newUser = await UserModel.create({
      ...userInfo,
      password: hashPassword
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).end(error.message);
  }
});

// login
authRouter.post("/login", async (req, res) => {
  try {
    const loginInfo = req.body;
    console.log(loginInfo.email, loginInfo.password);
    // check email/password empty

    const user = await UserModel.findOne({ email: loginInfo.email }).exec();
    if (!user) {
      res.status(404).json({
        message: "User not found",
        success: false
      });
    } else {
      const comparePassword = await brcyptjs.compare(
        loginInfo.password,
        user.password
      );
      if (comparePassword) {
        //success
        // save session storage
        req.session.user = {
            _id: user._id,
            email: user.email,
            permissions: user.permissions.length > 0 ? user.permissions : [],
        };
        req.session.save();

        res.status(200).json({
          message: "Login success",
          success: true
        });
      } else {
          // failed
        res.status(200).json({
          message: "Password inst correct",
          success: false
        });
      }
    }
  } catch (error) {
    res.status(500).end(error.message);
  }
});

authRouter.get('/test', (req, res) => {
    console.log(req.session);
    res.status(200).end();
});


// logout

authRouter.get('/logout', async (req, res) => {
    try{
        req.session.destroy();
        res.status(200).json({
            message: 'Log out success',
            success: true,
        })
    }catch(error){
        res.status(500).end(error.message);
    }
});

module.exports = authRouter;