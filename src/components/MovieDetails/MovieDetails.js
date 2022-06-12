import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import "./MovieDetails.css";
import { IoStar } from "react-icons/io5";
import { fetchData } from "../../utils/fetchData";

export const MovieDetails = () => {
  const params = useParams();
  const [movie, setMovie] = useState({});
  const [cast, setCast] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchClickedMovie = async () => {
    const movieData = await fetchData(
      `lookup/shows?thetvdb=${params?.movieID}`,
      "Movie fetch error"
    );
    setMovie(movieData);
    const cast = await fetchData(
      `shows/${movieData?.id}/cast`,
      "Cast fetch error"
    );
    setCast(cast);
    setLoading(false);
  };

  useEffect(() => {
    fetchClickedMovie();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!loading && (
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
              <div
                className="movie-summary"
                dangerouslySetInnerHTML={{ __html: movie.summary }}
              ></div>
              <div className="other-container">
                <div className="movie-rating">
                  {movie?.rating?.average}/10
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
              {cast?.map((member) => {
                console.log(member);
                return <img src={member?.character?.image?.original} />;
              })}
    </>
  );
};
