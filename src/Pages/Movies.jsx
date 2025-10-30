import React, { useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { FaAngleRight, FaSearch } from "react-icons/fa";
import "../Styles/Movies.css";
import { useNavigate } from "react-router-dom";
import PaginationBar from "../Components/PaginationBar"; // ✅ make sure this file exists

const allmovies = [
  // Telugu movies
  { title: "RRR", image: "/Images/RRR.jpg", language: "TELUGU" },
  { title: "SALAAR", image: "/Images/salaar.png", language: "TELUGU" },
  { title: "JERSEY", image: "/Images/jersey.jpg", language: "TELUGU" },
  { title: "JAANU", image: "/Images/jaanu.jpg", language: "TELUGU" },
  { title: "KALKI 2898-AD", image: "/Images/kalki.jpg", language: "TELUGU" },
  { title: "HIT The third case", image: "/Images/hit.jpg", language: "TELUGU" },
  { title: "MAD SQUARE", image: "/Images/mad.png", language: "TELUGU" },

  // English movies
  { title: "OPPENHEIMER", image: "/Images/oppenheimer.jpg", language: "ENGLISH" },
  { title: "AVATAR The way of water", image: "/Images/avatar.jpg", language: "ENGLISH" },
  { title: "AVENGERS", image: "/Images/avengers.jpg", language: "ENGLISH" },
  { title: "PIRATES of The CARIBBEAN", image: "/Images/pirates.jpg", language: "ENGLISH" },
  { title: "INTERSTELLAR", image: "/Images/intersteller.jpg", language: "ENGLISH" },
  { title: "THE BATMAN", image: "/Images/the batman.jpg", language: "ENGLISH" },
  { title: "THE MEG", image: "/Images/the meg.jpg", language: "ENGLISH" },

  // Hindi movies
  { title: "DANGAL", image: "/Images/dangal.jpg", language: "HINDI" },
  { title: "FIGHTER", image: "/Images/fighter.jpg", language: "HINDI" },
  { title: "PATHAAN", image: "/Images/pathan.jpg", language: "HINDI" },
  { title: "12th fail", image: "/Images/12th fail.jpg", language: "HINDI" },
  { title: "TIGER 3", image: "/Images/tiger 3.jpg", language: "HINDI" },
  { title: "KABIR SINGH", image: "/Images/kabir singh.jpg", language: "HINDI" },
  { title: "CHHAAVA", image: "/Images/chhaava.png", language: "HINDI" },

  // Tamil movies
  { title: "JAILER", image: "/Images/jailer.jpg", language: "TAMIL" },
  { title: "NILAVUKU EN MEL ENNADI KOBAM", image: "/Images/nilayuku.jpg", language: "TAMIL" },
  { title: "DRAGON", image: "/Images/dragon.jpg", language: "TAMIL" },
  { title: "TOURIST FAMILY", image: "/Images/tou.jpg", language: "TAMIL" },
  { title: "VIKRAM", image: "/Images/vikram.jpg", language: "TAMIL" },
  { title: "AMARAN", image: "/Images/amaran.jpg", language: "TAMIL" },

  // Malayalam movies
  { title: "MANJUMMEL BOYS", image: "/Images/manjummel boys.jpg", language: "MALAYALAM" },
  { title: "GYMKHANA", image: "/Images/gymkhana.jpg", language: "MALAYALAM" },
  { title: "AAVESHAM", image: "/Images/aavesham.jpg", language: "MALAYALAM" },
];

const Movies = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("TV SHOW");
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage, setMoviesPerPage] = useState(20);

  const slugify = (title) =>
    title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

  const filteredMovies = allmovies.filter((movie) =>
    movie.title.toLowerCase().includes(query.toLowerCase())
  );

  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    console.log("Go to page:", page);
  };

  return (
    <div>
      <Header />

      {/* 🔹 SEARCH BAR */}
      <div className="search-bar-container">
        <div className="search-bar">
          <div className="dropdown-wrapper">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="search-dropdown"
            >
              <option value="TV SHOW">TV SHOW</option>
              <option value="MOVIE">OTHERS</option>
            </select>
          </div>

          <input
            type="text"
            placeholder={`Search for a ${category.toUpperCase()} or celebrity that you are looking for`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input"
          />

          <button className="search-btn">
            <FaSearch />
          </button>
        </div>
      </div>

      <section className="moviepage">
        <div className="moviesheading">
          <h1>MOVIES</h1>
          <p>
            <a href="/home">HOME</a> <span><FaAngleRight /></span> MOVIES
          </p>
        </div>

        <div className="totalmovies">
          <div className="foundtotal">
            <p>
              Found <span>{filteredMovies.length}</span> in total
            </p>
            <p>Sort by:</p>
          </div>
          <form>
            <select name="selection">
              <option value="popularity descending">Popularity Descending</option>
              <option value="popularity ascending">Popularity Ascending</option>
              <option value="rating descending">Rating Descending</option>
              <option value="release asc">Release Date Ascending</option>
              <option value="release desc">Release Date Descending</option>
            </select>
          </form>
        </div>

        <div className="allcards">
          {filteredMovies.map((movie, index) => (
            <div className="movie-card" key={index}>
              <div
                className="hover-container"
                onClick={() => navigate(`/movies/${slugify(movie.title)}`)}
                style={{ cursor: "pointer" }}
              >
                <img src={movie.image} alt={movie.title} />
                <div className="overlay">
                  <button className="hover-button">Read More</button>
                </div>
              </div>
              <h5>{movie.title}</h5>
            </div>
          ))}
        </div>

        <PaginationBar
          currentPage={currentPage}
          totalPages={totalPages}
          moviesPerPage={moviesPerPage}
          setMoviesPerPage={setMoviesPerPage}
          handlePageChange={handlePageChange}
        />
      </section>

      <Footer />
    </div>
  );
};

export default Movies;
