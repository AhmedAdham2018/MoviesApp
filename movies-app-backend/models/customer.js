const mongoose = require('mongoose');
const Joi = require('joi');


const customerSchema = new mongoose.Schema({
    name: {type: String , required: true , minLength: 5 , maxLength: 25},
    isGold: {type: Boolean , default: false},
    phone: {type: String , required: true , minLength: 7 , maxLength: 11}
});

const Customer = mongoose.model('Customer' , customerSchema);


function validateCustomer(customer) {
    const schema = Joi.object({
        name: Joi.string().min(5).required(),
        isGold: Joi.boolean(),
        phone: Joi.string().min(7).max(11).required()
    });
    
    return schema.validate(customer);
}

module.exports.validateCustomer = validateCustomer;
exports.Customer = Customer;