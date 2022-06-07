import './Movies.css';
import { IoStar } from 'react-icons/io5';

export function Movies(props) {
    const { movieImage , movieName, movieRating } = props;
    return(
    <div className='movies-container'>
        <div className='movie-image-container'>
            <img className='movie-image' src={movieImage} alt={movieName} />
        </div>
        <h3 className='movie-name'>{movieName}</h3>
        <span className='movie-rating'>
            {movieRating || '0'} <IoStar color='#bdbdbd' /> 
        </span>
    </div>
    );
}
