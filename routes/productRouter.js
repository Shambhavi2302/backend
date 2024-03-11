const express = require('express');

const productController = require('../controllers/productController');

const productRouter = express.Router();

productRouter.post('/addProduct',productController.createProduct);
productRouter.get('/getProduct/:id',productController.getProductById);
productRouter.get('/getAllProducts',productController.getProducts);
productRouter.post('/getBySearch',productController.getBySearch);
productRouter.delete('/delete/:id',productController.deleteProduct);

module.exports = productRouter