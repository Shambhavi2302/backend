// const mongoose = require('mongoose');

// const {Schema} = mongoose

// const bookMarkSchema = new Schema({
//     email:{type:String},
//     userId: {type:String},
//     productId : {type:String}
// })

// module.exports = mongoose.model('Bookmark',bookMarkSchema);

const mongoose = require('mongoose');
 
const bookmarkSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
        unique:true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});
 
const Bookmark = mongoose.model('Bookmark', bookmarkSchema);
 
module.exports = Bookmark;