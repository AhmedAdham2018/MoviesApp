import React, { Component } from 'react';
import { getMovies , deleteMovie } from './../services/movieService';
import Pagination from './common/pagination';
import { paginate } from './../utils/paginate';
import GenreList from './common/genre_list';
import { getGenres } from './../services/genreService';
import MoviesTable from './movies_table';
import _ from 'lodash';
import {toast} from 'react-toastify';
import SearchInput from './common/search_input';
import { Link } from 'react-router-dom';


class Movies extends Component {

state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: null,
    searchQuery: "",
    sortingColumn: {path: 'title' , order: 'asc'}
};

async componentDidMount() {
    const {data} = await getGenres();
    //console.log(data);
    const genres = [{_id: '' , name: "All genres"}, ...data];
    const movies = await getMovies();
    this.setState({movies: movies.data, genres:genres });
}


deleteMovieHandler = async movie => {
    const oldMovies = this.state.movies;
    const movies = oldMovies.filter(m => m._id !== movie._id);
    this.setState({ movies });

    try {
        await deleteMovie(movie._id)
    } catch (error) {
        if(error.response && error.response.status === 404)
           toast.error('The movie has already been deleted.');
        this.setState({movies: oldMovies});
    }
}

isLikedHandler = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = {...movies[index]};
    movies[index].isLiked = !movies[index].isLiked;
    this.setState({ movies });
}

pageChangeHandler = page => {
this.setState({currentPage: page});
}
genresChangeHandler = genre => {
this.setState({currentGenre: genre , currentPage: 1});
//console.log(genre);
}

sortingHandler = sortingColumn => {
this.setState({ sortingColumn });
//console.log(path);
}

getPageData = () => {
const {currentPage , pageSize , movies: allMovies , currentGenre, searchQuery , sortingColumn} = this.state;

let filteredMovies = allMovies;
if (searchQuery) {
    filteredMovies = allMovies.filter(movie => movie.title.toLowerCase().startsWith(searchQuery.toLowerCase()));
} else if (currentGenre && currentGenre._id){
    filteredMovies = allMovies.filter(movie => movie.genre._id ===
        currentGenre._id);
}

// sorting movies list..
const sortingMovies = _.sortBy(filteredMovies , [sortingColumn.path], [sortingColumn.order]);

const movies = paginate(sortingMovies , currentPage , pageSize);

return {totalDataCount: filteredMovies.length , data: movies};
}

searchMoviesHandler = query => {
    this.setState({searchQuery: query, currentGenre: null , currentPage: 1});
}

render() {
const {length: count} = this.state.movies;
const {currentPage , pageSize , sortingColumn , searchQuery} = this.state;

const {totalDataCount , data} = this.getPageData();

return ( <React.Fragment>
    {count === 0 ? <p>There is no movies in database...</p> :
    <div className="row">
        <div className="col-3">
            <GenreList genres={this.state.genres} currentGenre={this.state.currentGenre}
                onGenreChange={this.genresChangeHandler} />
        </div>
        <div className="col">
            {this.props.user && <Link className="btn btn-primary" to="/movies/new">New Movie</Link>}
            <h1>Showing {totalDataCount} movies in database.</h1>
            <SearchInput value={searchQuery} onChange={this.searchMoviesHandler}/>
            <MoviesTable movies={data} onLiked={this.isLikedHandler} onDelete={this.deleteMovieHandler}
                sortingColumn={sortingColumn} onSorting={this.sortingHandler} />
            <Pagination moviesCount={totalDataCount} pageSize={pageSize} currentPage={currentPage}
                onPageChange={this.pageChangeHandler} />
        </div>
    </div>
    }</React.Fragment> );
}
}

export default Movies;