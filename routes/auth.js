
const router = require('express').Router();
const User = require('../models/User.js');
const Joi = require('@hapi/joi');
const {registerValidation, loginValidation} = require('/Users/yuriikalashnikov/Desktop/Build A Restful Api With Node.js Express & MongoDB _ Rest Api/validation.js');


router.post('/register', async (req, res) => {
    //Validate the data 
   const { error } = registerValidation(req.body);
   if(error) return res.status(400).send(error.details[0].message);
   //Check a new user if exist 
   const userExist = await User.findOne({email:req.body.email})
   if (userExist) return res.status(400).send('Email is already exist')
    // Create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    try {
       const savedUser = await user.save();
       res.send(savedUser);
      
    } catch(err) {
        res.status(400).send(err);
    };
});

module.exports = router;
