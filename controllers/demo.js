const userModel = require("../models/userModel")
const bookmark = require('../models/bookMarkModel')
 
async function userProfile(req, res) {
    try {
        console.log("userId - userprofile", req._id)
 
        const user = await bookmark.findOne({ productId: req._id }).select("-password")
 
        res.status(200).json({
            message: "user details",
            data: user,
            error: false,
            success: true,
        })
 
    } catch (err) {
        res.status(500).json({
            message: err,
            error: true,
            success: false
        })
    }
 
}
 
module.exports = userProfile
