const GenreList = props => {
    const {genres , currentGenre, onGenreChange} = props;
    return ( <ul className="list-group">
    {genres.map(genre => <li className={genre === currentGenre ? "list-group-item active clickable" : "list-group-item clickable"} key={genre._id} onClick={() => onGenreChange(genre)}>{genre.name}</li>)}
    </ul> );
}
 
export default GenreList;