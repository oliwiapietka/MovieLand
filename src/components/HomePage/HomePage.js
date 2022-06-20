import "./HomePage.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Filter } from "../Filter/Filter";
import { motion, AnimatePresence } from "framer-motion";
import { ClipLoader } from "react-spinners";

export function HomePage() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeGenre, setActiveGenre] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPopularMovies = async () => {
    const res = await axios
      .get("https://api.tvmaze.com/shows?page=1")
      .catch((err) => {
        console.log("Eror: ", err);
      });

    if (res) {
      setPopularMovies(res.data);
      setFiltered(res.data);
      console.log("Response: ", res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  return (
    <>
      <Filter
        popular={popularMovies}
        setFiltered={setFiltered}
        activeGenre={activeGenre}
        setActiveGenre={setActiveGenre}
      />

      <Link style={{ textDecoration: "none" }} to="/movie/:movieID">
        <motion.div layout className="home-page">
          {
            <>
              {loading && (
                <div className="home-page-loading-wrapper">
                  <ClipLoader loading color="gray" size={75} />
                </div>
              )}
              {filtered
                .sort((a, b) => (a.rating.average > b.rating.average ? -1 : 1))
                .map((show) => (
                  <Link
                    key={show.externals.thetvdb}
                    style={{ textDecoration: "none" }}
                    to={`/movies/${show.externals.thetvdb}`}
                  >
                    <motion.div
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="popular-movies-container"
                    >
                      <AnimatePresence>
                        <div
                          key={show.id}
                          className="popular-movie-image-container"
                        >
                          <img
                            className="popular-movie-image"
                            src={show.image.original}
                            alt={show.name}
                          />
                        </div>
                        <div className="popular-movie-name">{show.name}</div>
                      </AnimatePresence>
                    </motion.div>
                  </Link>
                ))}
            </>
          }
        </motion.div>
      </Link>
    </>
  );
}
