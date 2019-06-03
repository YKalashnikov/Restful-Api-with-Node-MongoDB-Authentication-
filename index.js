const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRouter = require('./routes/auth');
const accountRoute = require('./routes/account.js');
const app = express();

dotenv.config();

//Conect to Db  
mongoose.connect(process.env.CONNECT_DB,{ useNewUrlParser: true },()=>console.log('Running DB'));


//Middleware
app.use(express.json());
app.use('/api/user', authRouter);
app.use('/api/accounts', accountRoute)
//Routes



app.listen(3000, ()=>console.log('Server is running'));