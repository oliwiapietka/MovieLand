import "./Filter.css";
import { useEffect } from "react";

export function Filter({ popular, setFiltered, activeGenre, setActiveGenre }) {
  useEffect(() => {
    if (activeGenre === "All") {
      setFiltered(popular);
      return;
    }
    const filtered = popular.filter((movie) =>
      movie.genres.includes(activeGenre)
    );
    setFiltered(filtered);
  }, [activeGenre]);

  return (
    <div className="filter-container">
      <button
        className={activeGenre === "All" ? "active" : ""}
        onClick={() => setActiveGenre("All")}
      >
        All
      </button>
      <button
        className={activeGenre === "Comedy" ? "active" : ""}
        onClick={() => setActiveGenre("Comedy")}
      >
        Comedy
      </button>
      <button
        className={activeGenre === "Action" ? "active" : ""}
        onClick={() => setActiveGenre("Action")}
      >
        Action
      </button>
      <button
        className={activeGenre === "Drama" ? "active" : ""}
        onClick={() => setActiveGenre("Drama")}
      >
        Drama
      </button>
      <button
        className={activeGenre === "Romance" ? "active" : ""}
        onClick={() => setActiveGenre("Romance")}
      >
        Romance
      </button>
      <button
        className={activeGenre === "Thriller" ? "active" : ""}
        onClick={() => setActiveGenre("Thriller")}
      >
        Thriller
      </button>
    </div>
  );
}
