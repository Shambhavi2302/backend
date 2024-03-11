// const express = require('express')

// const bookMarkController = require('../controllers/bookMarkController');

// const bookMarkRouter = express.Router();

// bookMarkRouter.post('/bookMarked/:productid/:userid',bookMarkController.addBookMark);
// bookMarkRouter.get('/:id',bookMarkController.findAll);


// module.exports = bookMarkRouter

const express = require('express');
const router = express.Router();
const bookmarkController = require('../controllers/bookMarkController');
 
router.get('/getAllBookmarks/:id', bookmarkController.getUserBookmarks);
router.post('/:productId/:userId', bookmarkController.addBookmark);
router.delete('/remove/:id', bookmarkController.removeBookmark);

 
module.exports = router;