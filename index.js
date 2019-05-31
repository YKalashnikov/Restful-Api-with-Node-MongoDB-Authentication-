const express = require('express');

const app = express();

const authRouter = require('./routes/auth');

//Middleware
app.use('/api/user', authRouter);
//Routes



app.listen(3000, ()=>console.log('Server is running'));