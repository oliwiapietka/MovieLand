import "./HomePage.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export function HomePage() {
  const [popularMovies, setPopularMovies] = useState([]);
  
  const fetchPopularMovies = async () => {
    const res = await axios
    .get("https://api.tvmaze.com/shows?page=1")
    .catch((err) => {
      console.log("Eror: ", err);
    });
    
    if (res) {
      setPopularMovies(res.data);
      console.log("Response: ", res.data);
    }
  };

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  return (
    <Link style={{ textDecoration: "none" }} to="/movie/:movieID">
      <div className="home-page">
        {
          <>
            {popularMovies.sort((a, b) => a.rating.average > b.rating.average ? -1 : 1).map((show) => (
              <Link
                style={{ textDecoration: "none" }}
                to={`/movies/${show.externals.thetvdb}`}
              >
                <div
                  key={show.externals.thetvdb}
                  className="popular-movies-container"
                >
                  <div className="popular-movie-image-container">
                    <img
                      className="popular-movie-image"
                      src={show.image.original}
                      alt=""
                    />
                  </div>
                  <div className="popular-movie-name">{show.name}</div>
                </div>
              </Link>
            ))}
          </>
        }
        </div>
    </Link>
  );
}
