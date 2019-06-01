const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = express();

dotenv.config();

//Conect to Db  
mongoose.connect(process.env.MONGO_DB,{ useNewUrlParser: true },()=>console.log('Running DB'));

const authRouter = require('./routes/auth');

//Middleware
app.use('/api/user', authRouter);
//Routes



app.listen(3000, ()=>console.log('Server is running'));