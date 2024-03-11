const mongoose = require('mongoose')

const {Schema} = mongoose

const productSchema = new Schema({
    productName:{type:String,required:true},
    productPrice:{type:Number,required:true},
    productQuantity:{type:Number,required:true},
    productCategory:{type:String}
})



module.exports = mongoose.model("Product",productSchema);