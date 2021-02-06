import React, { Component } from 'react';
import { getMovies } from './../services/movieService';
import Pagination from './common/pagination';
import { paginate } from './../utils/paginate';
import GenreList from './common/genre_list';
import { getGenres } from './../services/genreService';
import MoviesTable from './movies_table';
import _ from 'lodash';


class Movies extends Component {

state = {
movies: [],
genres: [],
pageSize: 4,
currentPage: 1,
sortingColumn: {path: 'title' , order: 'asc'}
};

componentDidMount(){
const genres = [{_id: '' , name: "All genres"}, ...getGenres()];
this.setState({movies: getMovies(), genres});
}


deleteMovieHandler = (movie) => {
const movies = this.state.movies.filter(m => m._id !== movie._id);
this.setState({ movies });
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
const {currentPage , pageSize , movies: allMovies , currentGenre , sortingColumn} = this.state;

const filteredMovies = currentGenre && currentGenre._id ? allMovies.filter(movie => movie.genre._id ===
currentGenre._id) : allMovies;
// sorting movies list..
const sortingMovies = _.sortBy(filteredMovies , [sortingColumn.path], [sortingColumn.order]);

const movies = paginate(sortingMovies , currentPage , pageSize);

return {totalDataCount: filteredMovies.length , data: movies};
}

addNewMovieHandler = () => {
    this.props.history.push("/movies/new");
}

render() {
const {length: count} = this.state.movies;
const {currentPage , pageSize , sortingColumn} = this.state;

const {totalDataCount , data} = this.getPageData();

return ( <React.Fragment>
    {count === 0 ? <p>There is no movies in database...</p> :
    <div className="row">
        <div className="col-3">
            <GenreList genres={this.state.genres} currentGenre={this.state.currentGenre}
                onGenreChange={this.genresChangeHandler} />
        </div>
        <div className="col">
            <button className="btn btn-primary" onClick={this.addNewMovieHandler}>New Movie</button>
            <h1>Showing {totalDataCount} movies in database.</h1>
            <input type="text" className="form-control" placeholder="Search..." />
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