const jwt = require('jsonwebtoken');
const Bookmark = require('../models/bookMarkModel');

const verifyTokenAndPushToAnotherModel = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader) {
            return res.status(401).json({ message: "Access token not provided" });
        }

        const jwtToken = authHeader.split(" ")[1];

        if (!jwtToken) {
            return res.status(401).json({ message: "Invalid access token" });
        }

        // Verify the token
        jwt.verify(jwtToken, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Unauthorized access" });
            }

            // Attach the decoded token to the request for future use
         //   req.email = decoded?.email;
            req.userId=decoded?._id
            // req._id = decoded?._id;
           

            // Push email to AnotherModel
            const newEntry = await Bookmark.create({ _id: req._id });
            console.log("New Bookmark Entry:", newEntry._id);

            // Attach the new entry's ID to the request for future use if needed
            // req.bookmarkId = newEntry._id;

            next();
        });
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

module.exports = verifyTokenAndPushToAnotherModel;
