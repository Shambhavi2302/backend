const Product = require("../models/productModel")
const jwt = require('jsonwebtoken')

// create product

exports.createProduct = (req,res) =>
{
    const newProduct = req.body;
    if(newProduct!=null)
    {
        Product.create(newProduct)
        .then((data)=>res.status(201).send("Product added Successfully"))
        .catch((error)=>res.status(400).send({error:error}))
    }
    else
    {
        res.status(400).send("New product details not received")
    }
}

// get product by Id

exports.getProductById = (req,res) =>
{
    const id = req.params.id;

    Product.findById(id)
    .then((data)=>{
        res.status(200).send(data)
        console.log(data)
    })
    .catch((error)=>res.status(400).send({error:error}))
}

// exports.geWhilistProduct = (req,res) =>
// {
//     const id = req.params.id;

//     Bookmark.findById(id)
//     .then((data)=>{
//         res.status(200).send(data)
//         console.log(data)
//     })
//     .catch((error)=>res.status(400).send({error:error}))
// }

// get all products

exports.getProducts = (req,res) =>
{
    const token = req.headers.token;
    console.log(token);
    if(!token)
    {
        return res.status(403).json({error:"Token is required"});
    }
    jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
        if(err)
        {
            console.log("There is an error")
            return res.status(401).json({error:"Token is invalid"})
        }
        else
        {
            
        Product.find().sort({productName:1})
    .then((data)=>{
        res.status(200).send(data)
        console.log(data)
    })
    .catch((error)=>res.status(400).send({error:error}))
}
    })
    
}

// search products

exports.getBySearch = (req,res) =>{
    const name = req.body.productName;

    Product.find({productName:{$regex:new RegExp('^' + name)}})
    .then((data)=>res.status(200).send(data))
    .catch((error)=>res.status(400).send({error:error}))
}

// delete product

exports.deleteProduct = (req, res) => {
    const id = req.params.id;
 
    Product.findByIdAndDelete(id)
        .then(() => res.status(201).send("Deleted successfully"))
        .catch((err) => res.status(404).send("Id not found: " + err));
};