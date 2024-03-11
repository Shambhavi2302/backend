
const Bookmark = require('../models/bookMarkModel')

exports.addBookmark = (req,res) =>{
    const productId = req.params.id;

    Bookmark.create(productId)
    .then(()=>res.status(201).send("Bookmark created succesfully!!"))
    .catch((err)=>res.status(400).send("Id not found"))
}


