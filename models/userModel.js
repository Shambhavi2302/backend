const mongoose = require('mongoose')

const {Schema} = mongoose

const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new Schema({
    username:{type:String},
    email:{type:String,required: true, unique: true},
    password:{type:String}
})

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User",userSchema);