import "./Movies.css";
import { IoStar } from "react-icons/io5";

export function Movies(props) {
  const { movieImage, movieName, movieRating } = props;
  return (
    <div className="searchbar-movies-container">
      <div className="searchbar-movie-image-container">
        {movieImage && (
          <img
            className="searchbar-movie-image"
            src={movieImage}
            alt={movieName}
          />
        )}
      </div>
      <h3 className="searchbar-movie-name">{movieName}</h3>
      <span className="searchbar-movie-rating">
        {movieRating || "0"} <IoStar color="#bdbdbd" />
      </span>
    </div>
  );
}
