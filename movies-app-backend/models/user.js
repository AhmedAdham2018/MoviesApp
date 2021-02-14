const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
    name: {type: String , required: true , minlength: 5,maxlength: 50},
    email: {type: String , unique: true , minlength: 5,maxlength: 50, required: true},
    password: {type: String , minlength: 5,maxlength: 1024, required: true},
    isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function () {
   return jwt.sign({_id: this._id , isAdmin: this.isAdmin} , config.get('jwtPrivateKey'));
}

const User = mongoose.model('User' , userSchema);

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(50).required().email(),
        password: Joi.string().min(5).max(1024).required()
    });

    return  schema.validate(user);
}

exports.validateUser = validateUser;
exports.User = User;