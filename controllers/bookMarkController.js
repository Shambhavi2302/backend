// const Bookmark = require('../models/bookMarkModel');
// const Product = require('../models/productModel');

// exports.addBookMark = async (req,res) =>{
//     try {
//         const productId = req.params.id;
        
    
//         // Find product details
//         const productDetails = await Product.findById(productId);
    
//         // If product details are found, create a bookmark and send response
//         if (productDetails) {
//             // Create a new bookmark
//             const newBookmark = new Bookmark({
//                 //userId: "65e6b0b63563af8c1a0863e8",
//                 productId: productId
//             });
    
//             // Save the new bookmark to the database
//             const savedBookmark = await newBookmark.save();
    
//             // Send a response indicating that the bookmark was saved
//             res.status(201).json(savedBookmark);
//         } else {
//             // If product is not found, send a 404 error response
//             res.status(404).json({ error: 'Product not found' });
//         }
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ error: 'Internal server error' });
//     }
    
    
   
// }

// exports.findAll = (req,res) =>{
//     const id=req.id;
//     Bookmark.find(id).then((data)=>res.status(200).send(data)).catch((err)=>res.status(400).send(err))
// }

// exports.addBookmark = async (req, res) => {
//     const { userId, productId } = req.params;
 
//     const newBookmark = new Bookmark({ userId, productId });
 
//     try {
//         await newBookmark.save();
//         res.status(201).send(newBookmark);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// };

const Bookmark = require('../models/bookMarkModel');
const mongoose = require('mongoose');
 


exports.addBookmark = async (req, res) => {
    const { userId, productId } = req.params;
 
    // Check if the bookmark already exists for the given userId and productId
    const existingBookmark = await Bookmark.findOne({ userId, productId });
    console.log(existingBookmark);
    if (existingBookmark) {
        return res.status(400).json({ message: 'Bookmark already exists.' });
    }
 
    // If the bookmark does not exist, create a new bookmark
    const newBookmark = new Bookmark({ userId, productId });
 
    try {
        await newBookmark.save();
        res.status(201).send(newBookmark);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
 
exports.removeBookmark = async (req, res) => {
    const  id  = req.params;
 
    try {
        await Bookmark.deleteMany({productId:new mongoose.Types.ObjectId(id)});
        res.status(200).json({ message: 'Bookmark deleted successfully' });
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};
 
 
 
exports.getUserBookmarks = async (req, res) => {
    const  userId  = req.params.id;
    console.log("USer id=",userId)
 
    try {
        const bookmarks = await Bookmark.find({ userId : userId});
        console.log(Bookmark.userId)
        console.log(bookmarks)
        res.status(200).send(bookmarks);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};