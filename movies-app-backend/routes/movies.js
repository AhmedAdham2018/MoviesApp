const express = require('express');
const router = express.Router();
router.use(express.json());
const {Movie , validateMovie} = require('../models/movie');
const {Genre} = require('../models/genre');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const asyncMiddleware = require('../middleware/async');


router.get('/' , asyncMiddleware(async(req , res) => {
   const movies = await Movie.find(); 
   res.send(movies);
}));


router.get('/:id' , asyncMiddleware(async (req , res) => {
    const movie = await Movie.findById(req.params.id);
    if(!movie) return res.status(404).send('Movie not found!');
    res.send(movie);
}));

router.post('/', auth , asyncMiddleware(async (req , res) => {
    const {error} = validateMovie(req.body);

    if(error) return res.status(400).send(error.details[0].message);
    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(404).send('Invalid genre');
        
    let movie = new Movie({title: req.body.title , genre: {_id: genre._id , name: genre.name} , numberInStock: req.body.numberInStock, dailyRentalRate: req.body.dailyRentalRate});
    
    movie =  await movie.save();
    res.send(movie);
}));

router.put('/:id' , [auth , admin], asyncMiddleware(async (req , res) =>{
    const {error} = validateMovie(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const movie = await Movie.findByIdAndUpdate(req.params.id , {title: req.body.title , genre: req.body.genre , numberInStock: req.body.numberInStock, dailyRentalRate: req.body.dailyRentalRate});
    
    if(!movie) return res.status(404).send('The movie with a given id not found!');
    res.send(movie);
}));

router.delete('/:id' , [auth , admin], asyncMiddleware(async (req , res) =>{
    const movie = await Movie.findByIdAndRemove(req.params.id);
    if(!movie) res.status(404).send('The movie with a given id not found!');
    res.send(movie);
}));


module.exports = router;