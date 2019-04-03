const express = require('express');
const UserModel = require('./models');

const userRouter = express();

userRouter.post('/', async (req, res) => {
    // create user
    try{
        //check email
        const existEmail = await UserModel.findOne({
            email: req.body.email,
        }).exec();
        if(existEmail){
            res.status(403).end('Email has been used')
        }

        // save to db
        const userInfo = req.body;
        const newUser = await UserModel.create({
            ...userInfo,
            createdAt: new Date(),
        });
        res.status(201).json(newUser);
    }catch(error){
        res.status(500).end(error.message);
    };
    
}); 
module.exports = userRouter;