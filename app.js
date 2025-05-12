
const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
const userRouter = require('./routes/userRouter');
const tourRouter = require('./routes/tourRouter');
const app = express();
//1-Middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use((req,res,next)=>{
    console.log('Hello, from middleware');
    next();
});
app.use((req,res,next)=>{
    req.requestTime = new Date().toISOString();
    next();
});
//2-Route Handler


app.use('/api/v1/tours',tourRouter);
app.use('/api/v1/userrs',userRouter);
//4-Start Server
const port = 3000;
app.listen(port,()=>{
    console.log(`App running on port${port}`);
})
