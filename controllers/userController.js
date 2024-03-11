
const User = require('../models/userModel')
const bcryptjs = require('bcrypt');
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer');

// add new user details in db

exports.registerUser = async (req,res) =>{
    try {
        //checking validation from server side!!
        if (!req.body.email) {
            return res.status(400).json({
                messageM: "Please provide email",
                error: true,
                success: false
            })
        }
 
        if (!req.body.username) {
            return res.status(400).json({
                messageU: "Please provide username",
                error: true,
                success: false
            })
        }
 
        if (!req.body.password) {
            return res.status(400).json({
                messageP: "Please provide password",
                error: true,
                success: false
            })
        }
 
        // finding user from database
        const user = await User.findOne({ email: req.body.email })
 
        if (user) {
            return res.status(400).json({
                messageU: "User already exists",
                error: true,
                success: false
            })
        }
 
        //convert password into hash
        bcryptjs.genSalt(10, function (err, salt) {
            bcryptjs.hash(req.body.password, salt, async function (err, hash) {
                
                if (err) {
                    return res.status(400).json({
                        message: err,
                        error: true,
                        success: false
                    })
                }
                console.log("hash", hash)
 
                const payload = {
                    ...req.body,
                    password: hash
                }
 
                const userDetails = new User(payload)
                const save = await userDetails.save()
 
                return res.status(200).json({
                    message: "User Created successfully",
                    data: save,
                    error: false,
                    success: true
                })
 
            });
        });
    } catch (error) {
        res.status(500).json({
            message: error,
            error: true,
            success: false
        })
    }
}

// if already a user authenticate the user

exports.authenticate = async (req,res) =>{

    try{
    const email = req.body.email;
    const password = req.body.password;

    if(!email)
    {
        return res.status(400).json({
            messageM: "Please provide email",
            error: true,
            success: false
        })
    }
    if(!password)
    {
        return res.status(400).json({
            messageP: "Please provide password",
            error: true,
            success: false
        })
    }

    const user = await User.findOne({email})
    if(!user)
    {
        return res.status(400).json({
            messageM: "User not available",
            error:true,
            success: false
        })
    }

    bcryptjs.compare(password,user.password,function(err,passwordMatch){
        if(err)
        {
            return res.status(400).json({
                messageP: "Check your password",
                error: true,
                success: false
            })
        }

        if(!passwordMatch){
            return res.status(400).json({
                messageP: "Incorrect password",
                error: true,
                success: false
            })
        }

        const payload = {
            _id: user._id,
            email: user.email  
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '7d' 
        });
        

        res.status(200).json({
            token: token,
            error: false,
            success: true,
            message: "Login successful"
        })
    })
    }
    catch(error)
    {
        res.status(500).json({
            message: error.message,
            error: true,
            success: false
        })
    }
}

exports.getUserDetails = (req,res) =>{
    const id = req.params.id;

    User.findById(id)
    .then((data)=>res.status(200).send(data))
    .catch((err)=>res.status(400).send(err))
}

exports.updateUser = async (req,res) => {
    const { id } = req.params; // Assuming id is passed in the URL parameter
    const { username, email } = req.body; // Assuming username and email are sent in the request body

    try {
        // Find the user by id
        let user = await User.findById(id);

        // If user not found, return 404 error
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update user details
        user.username = username;
        user.email = email;

        // Save the updated user
        await user.save();

        // Send success response
        res.status(200).json({ message: 'User details updated successfully', user });
    } catch (error) {
        console.error('Error updating user details:', error);
        // Send error response
        res.status(500).json({ message: 'Internal server error' });
    }
}

exports.sendEmail = async (req,res) =>{
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'shambhavi23032002@gmail.com', // Your Gmail address
            pass: 'ggll glku zafs fixu' // Your Gmail password
        }
    });

    //const { email, subject, text } = req.body;

    const email = "swamishambhavi2002@gmail.com";
    const subject = "Offers";
   // const text = "20% dsicount"
   const htmlContent = `
        <html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                }
                .card {
                    background-color: #f5f5f5;
                    border-radius: 10px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    padding: 20px;
                    margin-bottom: 20px;
                }
                .offer-title {
                    color: #007bff;
                    font-size: 20px;
                    margin-bottom: 10px;
                }
                .offer-details {
                    color: #555;
                    font-size: 16px;
                }
            </style>
        </head>
        <body>
            <div class="card">
                <h2 class="offer-title">Special Summer Offer</h2>
                <p class="offer-details">Get 20% off on all items. Use code: OFFER20</p>
            </div>
            <div class="card">
                <h2 class="offer-title">Special Offer on Credit Card</h2>
                <p class="offer-details">10% off on Axis Bank Credit Card Transactions, upto ₹1,250 on orders of ₹5,000 and above</p>
            </div>
        </body>
        </html>
    `;

    const mailOptions = {
        from: 'shambhavi23032002@gmail.com', // Sender address
        to: email, // Recipient's email address
        subject: subject,
        html: htmlContent
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error occurred:', error.message);
            res.status(500).send('Error occurred while sending email');
        } else {
            console.log('Email sent successfully:', info.response);
            res.send('Email sent successfully');
        }
    });
}