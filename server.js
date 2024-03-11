// import express
const express = require('express');

// import mongoose
const mongoose = require('mongoose');

const cors = require('cors');

require('dotenv').config()

const productRouter = require('./routes/productRouter')
const userRouter = require('./routes/userRouter');
const bookMarkRouter = require('./routes/bookMarkRouter');

const app = express();

const dbUrl = "mongodb://127.0.0.1:27017/product"

const port=4000;

// connect with the mongodb database
mongoose.connect(dbUrl)
.then(()=> console.log("Connection to mongodb succesful"))
.catch(()=> console.log("Connection to mongodb failed"));

app.use(express.json());
app.use(cors({origin:'*'}))
app.use(express.urlencoded({extended:true}))

// default root
app.get('/',(req,res)=> {
    res.status(200).send("An API for products");
});

// using express routes
app.use('/api/product',productRouter);
app.use('/api/user',userRouter);
app.use('/api/bookmarks',bookMarkRouter);
// app.use('/api/',userRouter);

app.listen(port,()=> console.log("Server listening at port no:"+port));