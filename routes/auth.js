
const router = require('express').Router();
const User = require('../models/User.js');
const Joi = require('@hapi/joi');
const {registerValidation, loginValidation} = require('../validation.js');
const bcrypt = require('bcryptjs');


router.post('/register', async (req, res) => {
    //Validate the data 
   const { error } = registerValidation(req.body);
   if(error) return res.status(400).send(error.details[0].message);
   //Check a new user if exist 
   const userExist = await User.findOne({email:req.body.email})
   if (userExist) return res.status(400).send('Email is already exist')

   //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try {
       const savedUser = await user.save();
       res.send({user: user._id});
      
    } catch(err) {
        res.status(400).send(err);
    };
});

    //Login
    router.post('/login', async (req, res) => {
        const { error } = loginValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message);
        //If email exist
        const user = await User.findOne({email: req.body.email })
;        if (!user) return res.status(400).send('Email is not found');
        //Password is correct
        const validPass = await bcrypt.compare(req.body.password, user.password);
        if (!validPass) return res.status(400).send('Password is incorrect');
        res.send('Logged in');
    })

module.exports = router;
