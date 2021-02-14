const mongoose = require('mongoose');
const {genreSchema} = require('./genre');
const Joi = require('joi');


const moviesSchema = new mongoose.Schema({
    title: {type: String , required: true , trim: true, minLength: 5 , maxLength: 50},
    genre: {type: genreSchema , required: true},
    numberInStock: {type: Number , min: 0 , max: 255, required: true},
    dailyRentalRate: {type: Number , min: 0 , max: 255, required: true}
});

const Movie = mongoose.model('Movie' , moviesSchema);


function validateMovie(movie) {
    const schema = Joi.object({
        title: Joi.string().min(5).required(),
        genreId: Joi.objectId().required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required()
    });
    
    return schema.validate(movie);
}

module.exports.validateMovie = validateMovie;
exports.Movie = Movie;