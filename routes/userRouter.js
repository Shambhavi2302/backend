const express = require('express');

const userController = require('../controllers/userController');

const verifyToken = require('../middleware/verifyToken')
const demo = require('../controllers/demo')

const userRouter = express.Router();

userRouter.post('/register',userController.registerUser);
userRouter.post('/authenticate',userController.authenticate);
userRouter.get('/getDetails/:id',userController.getUserDetails);
userRouter.put('/updateUser/:id',userController.updateUser);
userRouter.post('/mail',userController.sendEmail);
// userRouter.post('/authenticate',userController.authenticate);

module.exports = userRouter;