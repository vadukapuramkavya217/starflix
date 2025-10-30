import React, { useState } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { FaAngleRight, FaSearch } from 'react-icons/fa';
import '../Styles/NewPopular.css';
import { useNavigate } from 'react-router-dom';
import PaginationBar from "../Components/PaginationBar";

const allpopular = [
  { title: "KALKI 2898-AD", image: "Images/kalki.jpg", language: "TELUGU" },
  { title: "SALAAR", image: "Images/salaar.png", language: "TELUGU" },
  { title: "BREAKING BAD", image: "Images/breaking.jpg" },
  { title: "TOURIST FAMILY", image: "Images/tou.jpg", language: "TAMIL" },
  { title: "BIGBOSS", image: "Images/biggboss.jpg" },
  { title: "HIT The third case", image: "Images/hit.jpg", language: "TELUGU" },
  { title: "STRANGER THINGS", image: "Images/stranger.jpg" },
  { title: "OPPENHEIMER", image: "Images/oppenheimer.jpg", language: "ENGLISH" },
  { title: "AVATAR The way of water", image: "Images/avatar.jpg", language: "ENGLISH" },
  { title: "CHHAAVA", image: "Images/chhaava.png", language: "HINDI" },
  { title: "NILAVUKU EN MEL ENNADI KOBAM", image: "Images/nilayuku.jpg", language: "TAMIL" },
  { title: "DRAGON", image: "Images/dragon.jpg", language: "TAMIL" },
];

const Newpopular = () => {
  const navigate = useNavigate();

  // states
  const [category, setCategory] = useState('MOVIES');
  const [query, setQuery] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [genre, setGenre] = useState('');
  const [ratingRange, setRatingRange] = useState('');
  const [yearFrom, setYearFrom] = useState('');
  const [yearTo, setYearTo] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage, setMoviesPerPage] = useState(20);

  const totalMovies = allpopular.length;
  const totalPages = Math.ceil(totalMovies / moviesPerPage);

  const slugify = (title) =>
    title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

  const handlePageChange = (page) => {
    setCurrentPage(page);
    console.log("Go to page:", page);
  };

  return (
    <div>
      <Header />
      {/*<PaginationBar
        items={allpopular}
        initialPerPage={20}
        perPageOptions={[10, 20, 50, 100]}
        onCardClick={(movie) => navigate(`/movies/${slugify(movie.title)}`)}
      />
*/}
      {/* Search Bar */}
      <div className="search-bar-container">
        <div className="search-bar">
          <div className="dropdown-wrapper">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="search-dropdown"
            >
              <option value="MOVIES">MOVIES</option>
              <option value="OTHERS">OTHERS</option>
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
          <h1>NEW & POPULAR</h1>
          <p>
            <a href="/home">HOME</a>
            <span> <FaAngleRight /> </span> NEW & POPULAR
          </p>
        </div>

        <div className="movies-container">
          <div className="movies-left">
            <div className="totalmovies">
              <div className="foundtotal">
                <p>Found <span>{allpopular.length} movies</span> in total</p>
                <p>Sort by:</p>
              </div>
              <form>
                <select name="selection">
                  <option value="popularity-desc">Popularity Descending</option>
                  <option value="popularity-asc">Popularity Ascending</option>
                  <option value="rating-desc">Rating Descending</option>
                  <option value="rating-asc">Rating Ascending</option>
                  <option value="release-asc">Release Date Ascending</option>
                  <option value="release-desc">Release Date Descending</option>
                </select>
              </form>
            </div>

            <div className="allcards">
              {allpopular.map((shows, index) => (
                <div className="movie-card" key={index}>
                  <div
                    className="hover-container"
                    onClick={() => navigate(`/movies/${slugify(shows.title)}`)}
                    style={{ cursor: "pointer" }}
                  >
                    <img src={shows.image} alt={shows.title} />
                    <div className="overlay">
                      <button className="hover-button">Read More</button>
                    </div>
                  </div>
                  <h5>{shows.title}</h5>
                </div>
              ))}
            </div>
          </div>

          <div className="movies-right">
            <h2>SEARCH FOR MOVIE</h2>
            <div className="filter-section">
              <label>Movie name</label>
              <input
                type="text"
                placeholder="Enter keywords"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <label>Genres & Subgenres</label>
              <input
                type="text"
                placeholder="Enter to filter genres"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
              />

              <label>Rating Range</label>
              <select
                value={ratingRange}
                onChange={(e) => setRatingRange(e.target.value)}
              >
                <option>-- Select the rating range below --</option>
                <option value="0-5">0 - 5</option>
                <option value="5-7">5 - 7</option>
                <option value="7-10">7 - 10</option>
              </select>

              <label>Release Year</label>
              <div className="year-inputs">
                <input
                  type="number"
                  placeholder="From"
                  value={yearFrom}
                  onChange={(e) => setYearFrom(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="To"
                  value={yearTo}
                  onChange={(e) => setYearTo(e.target.value)}
                />
              </div>

              <button className="filter-submit">SUBMIT</button>
            </div>
          </div>
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

export default Newpopular;
