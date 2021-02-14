const mongoose = require('mongoose');
const Joi = require('joi');

const genreSchema = new mongoose.Schema({
    name: {type: String , required: true , minLength: 5 , maxLength: 25},
});

const Genre = mongoose.model('Genre' , genreSchema);


function validateGenre(genre) {
    const schema = Joi.object({
        name: Joi.string().min(5).required()
    });

    return schema.validate(genre);
}

exports.validateGenre = validateGenre;
exports.Genre = Genre;
exports.genreSchema = genreSchema;