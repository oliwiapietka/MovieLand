import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import "./MovieDetails.css";
import { IoStar } from "react-icons/io5";

const MovieDetails = () => {
  const params = useParams();
  const [movie, setMovie] = useState({});

  const fetchClickedMovie = async () => {
    const res = await axios
      .get(`https://api.tvmaze.com/lookup/shows?thetvdb=${params.movieID}`)
      .catch((err) => {
        console.log("Eror: ", err);
      });

    if (res) {
      setMovie(res.data);
      console.log("Response: ", res.data);
    }
  };

  useEffect(() => {
    fetchClickedMovie();
  }, [params]);

  return (
    <>
      {movie && (
        <div
          key={movie.externals && movie.externals.thetvdb}
          className="movie-container"
        >
          <div className="movie-image-container">
            {movie.image && (
              <img
                className="movie-image"
                src={movie.image && movie.image.original}
                alt={movie.name}
              />
            )}
            <div>
              <div className="movie-name">{movie.name}</div>
              <div className="movie-summary">{movie.summary}</div>
              <div className="other-container">
                <div className="movie-rating">
                  {movie.rating && movie.rating.average}/10
                  <IoStar />
                </div>
                <div className="movie-genres">{movie?.genres?.[0]}</div>
                <div className="movie-dates">
                  from {movie.premiered} to {movie.ended}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieDetails;
