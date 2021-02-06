import PropTypes from 'prop-types';

const Like = ({isLiked , onLiked}) => {

    if (isLiked) {
        return ( <span className="fas fa-heart clickable" onClick={onLiked}></span> );
    }
    else{
        return ( <span className="far fa-heart clickable" onClick={onLiked}></span> );
    } 
}

Like.propTypes = {isLiked: PropTypes.bool.isRequired , onLiked: PropTypes.func.isRequired};
 
export default Like;