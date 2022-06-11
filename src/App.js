import "./App.css";
import { HomePage } from "./components/HomePage/HomePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import MovieDetails from "./components/MovieDetails/MovieDetails";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/MovieLand" element={<HomePage />} />
          <Route path="/movies/:movieID" element={<MovieDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
