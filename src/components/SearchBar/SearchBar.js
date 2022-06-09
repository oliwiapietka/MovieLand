import React, { useState, useEffect, useRef } from "react";
import "./SearchBar.css";
import { IoClose, IoSearch } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";
import { useClickOutside } from "react-click-outside-hook";
import { ClipLoader } from "react-spinners";
import { useDebounce } from "../../hooks/debounceHook";
import axios from "axios";
import { Movies } from "../Movies/Movies";
import { Link } from "react-router-dom";

export function SearchBar(props) {
  const [isExpanded, setExpanded] = useState(false);
  const [ref, isClickedOutside] = useClickOutside();
  const inputRef = useRef();
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [noMovies, setNoMovies] = useState(false);

  const containerTransition = { type: "spring", damping: 22, stiffness: 150 };

  const isEmpty = !movies || movies.length === 0;

  const onChangeHandler = (e) => {
    e.preventDefault();
    if (e.target.value.trim() === "") setNoMovies(false);
    setSearchQuery(e.target.value);
  };

  const expandContainer = () => {
    setExpanded(true);
  };

  const collapseContainer = () => {
    setExpanded(false);
    setSearchQuery("");
    setLoading(false);
    setNoMovies(false);
    setMovies([]);
    if (inputRef.current) inputRef.current.value = "";
  };

  useEffect(() => {
    if (isClickedOutside) collapseContainer();
  }, [isClickedOutside]);

  const prepareSearchQuery = (query) => {
    const url = `http://api.tvmaze.com/search/shows?q=${query}`;
    return encodeURI(url);
  };

  const searchMovie = async () => {
    if (!searchQuery || searchQuery.trim() === "") return;

    setLoading(true);
    setNoMovies(false);

    const URL = prepareSearchQuery(searchQuery);
    const response = await axios.get(URL).catch((err) => {
      console.log("Error: ", err);
    });

    if (response) {
      console.log("Response: ", response.data);
      if (response.data && response.data.length === 0) setNoMovies(true);

      setMovies(response.data);
    }
    setLoading(false);
  };

  const containerVariants = {
    expanded: {
      height: "400px",
    },
    collapsed: {
      height: "50px",
    },
  };

  useDebounce(searchQuery, 500, searchMovie);

  return (
    <motion.div
      className="search-bar-container"
      animate={isExpanded ? "expanded" : "collapsed"}
      variants={containerVariants}
      transition={containerTransition}
      ref={ref}
    >
      <div className="search-input-container">
        <span className="search-icon">
          <IoSearch />
        </span>
        <input
          className="search-input"
          placeholder="Search for a movie.."
          onFocus={expandContainer}
          ref={inputRef}
          value={searchQuery}
          onChange={onChangeHandler}
        />
        <AnimatePresence>
          {isExpanded && (
            <motion.span
              className="close-icon"
              onClick={collapseContainer}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <IoClose />
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      {isExpanded && <div className="line-separator"></div>}
      {isExpanded && (
        <div className="search-content" onClick={collapseContainer}>
          {isLoading && (
            <div className="loading-wrapper">
              <ClipLoader loading color="gray" size={45} />
            </div>
          )}
          {!isLoading && isEmpty && !noMovies && (
            <div className="loading-wrapper">
              <span className="warning-message">
                Start typing to search a movie!
              </span>
            </div>
          )}
          {!isLoading && noMovies && (
            <div className="loading-wrapper">
              <span className="warning-message">No movies found!</span>
            </div>
          )}
          {!isLoading && !isEmpty && (
            <Link style={{ textDecoration: "none" }} to="/movie/:movieID">
              <>
                {movies.map(({ show }) => (
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`/movies/${show.externals.thetvdb}`}
                  >
                    <Movies
                      key={show.id}
                      movieImage={show.image && show.image.medium}
                      movieName={show.name}
                      movieRating={show.rating && show.rating.average}
                    />
                  </Link>
                ))}
              </>
            </Link>
          )}
        </div>
      )}
    </motion.div>
  );
}
