import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Like from './common/like';
import Table from './common/table';


class MoviesTable extends Component {

    columns = [
        {path: "title" , label: "Title" , content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>},
        {path: "genre.name" , label: "Genre"},
        {path: "numberInStock" , label: "Stock"},
        {path: "dailyRentalRate" , label: "Rate"},
        {key: "like" , content: movie => <Like isLiked={movie.isLiked} onLiked={()=> this.props.onLiked(movie)}/>},
        {key: "delete", content: movie => <button className="btn btn-danger" onClick={()=> this.props.onDelete(movie)}><i
        className="fas fa-trash"></i></button>}
    ];

render() {
const {movies , onSorting , sortingColumn} = this.props;

return (<Table data={movies} 
    onSorting={onSorting} 
    columns={this.columns} 
    sortingColumn={sortingColumn} /> );
}
}

export default MoviesTable;