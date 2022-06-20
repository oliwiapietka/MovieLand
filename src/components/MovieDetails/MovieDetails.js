import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import "./MovieDetails.css";
import { IoStar } from "react-icons/io5";
import { fetchData } from "../../utils/fetchData";
import { ClipLoader } from "react-spinners";

export const MovieDetails = () => {
  const params = useParams();
  const [movie, setMovie] = useState({});
  const [character, setCharacter] = useState({});
  const [seasons, setSeasons] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchClickedMovie = async () => {
    setLoading(true);
    const movieData = await fetchData(
      `lookup/shows?thetvdb=${params?.movieID}`,
      "Movie fetch error"
    );
    setMovie(movieData);
    const character = await fetchData(
      `shows/${movieData?.id}/cast`,
      "Character fetch error"
    );
    setCharacter(character);
    const seasons = await fetchData(
      `shows/${movieData?.id}/seasons`,
      "Seasons fetch error"
    );
    setSeasons(seasons);
    setLoading(false);
  };

  useEffect(() => {
    fetchClickedMovie();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.movieID]);

  return (
    <>
      {loading && (
        <div className="movie-details-loading-wrapper">
          <ClipLoader loading color="gray" size={75} />
        </div>
      )}
      {!loading && (
        <div
          key={movie.externals && movie.externals.thetvdb}
          className="movie-container"
        >
          <div className="movie-name">{movie.name}</div>
          <div className="movie-info-container">
            <div className="movie-image-container">
              {movie.image && (
                <img
                  className="movie-image"
                  src={movie.image && movie.image.original}
                  alt={movie.name}
                />
              )}
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
          <div className="movie-characters-text">MOVIE CHARACTERS</div>
          <div className="movie-character-container">
            {character?.map((member) => {
              console.log(member);
              return (
                <>
                  {member.character.image?.medium && (
                    <img
                      className="movie-character-image"
                      src={member.character?.image?.medium}
                      alt={member.character?.name}
                    />
                  )}
                  <p className="movie-character-name">
                    {member.character.name}
                  </p>
                </>
              );
            })}
          </div>
          <div className="seasons-text">SEASONS</div>
          <div className="movie-seasons-container">
            {seasons?.map((season) => {
              console.log(season);
              return (
                <>
                  <img
                    className="movie-season-image"
                    src={season?.image?.medium}
                    alt={season?.name}
                  />
                </>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};
