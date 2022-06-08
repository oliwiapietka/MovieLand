import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import "./MovieDetails.css";

const MovieDetails = () => {
  const params = useParams();
  const [movie, setMovie] = useState({});

  const fetchClickedMovie = async () => {
    const res = await axios
      .get(`https://api.tvmaze.com/lookup/shows?tvrage=${params.movieID}`)
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
          key={movie.externals && movie.externals.tvrage}
          className="movie-container"
        >
          <div className="movie-image-container">
            <img
              className="movie-image"
              src={movie.image && movie.image.original}
              alt="movie.name"
            />
          </div>
          <div className="movie-name">{movie.name}</div>
          {movie.summary}
        </div>
      )}
    </>
  );
};

export default MovieDetails;
