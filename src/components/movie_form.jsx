import React from "react";
import Joi from "joi-browser";

import Form from './common/form';
import { getGenres } from './../services/genreService';
import { getMovie } from "../services/movieService";
import { saveMovie } from './../services/movieService';


class MovieForm extends Form {
    state = { 
        data: {
            title: '',
            genreId: '',
            numberInStock: '',
            dailyRentalRate: ''
        },
        genres: [],
        errors: {}
     }


    schema = {
        title: Joi.string()
        .required(),
        genreId: Joi.string()
        .required(),
        numberInStock: Joi.number()
        .min(1)
        .max(1000)
        .required(),
        dailyRentalRate: Joi.number()
        .min(1)
        .max(10)
        .required(),
    };

    async fetchGenres (){
        const {data: genres} = await getGenres();
        this.setState({ genres });
    }

    async fetchMovies(){
        try {
            const movieId = this.props.match.params.id;
            if(movieId === "new") return;
            const {data: movie} = await getMovie(movieId);
            this.setState({ data: this.mapToViewModel(movie) });

        } catch (error) {
            if(error.response && error.response.status === 404) {
                this.props.history.replace("/not-found");
            }
        }
    }

    mapToViewModel = movie => {
        return {
            _id: movie._id,
            title: movie.title,
            genreId: movie.genre._id,
            numberInStock: movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate
        };
    }

    async componentDidMount() {
        await this.fetchGenres();
        await this.fetchMovies();
    }

    doSubmit = async () => {
        await saveMovie(this.state.data);
        this.props.history.push("/movies");
        console.log("save submitted.");
    }

    render() { 
        return ( <React.Fragment>
            <h1>Movie Form {this.props.match.params.id}</h1>
            <form onSubmit={this.submitHandler}>
                 {this.renderInput("title" , "Title")}
                 {this.renderSelectInput("genreId", "Genre" , this.state.genres)}
                 {this.renderInput("numberInStock" , "Number in stock" , "number")}
                 {this.renderInput("dailyRentalRate" , "Rate" , "number")}
                 {this.renderButton('Save')} 
            </form>
        </React.Fragment> );
    }
}
 
export default MovieForm;

