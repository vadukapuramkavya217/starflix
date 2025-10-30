import React, { useState } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { FaAngleRight, FaSearch } from 'react-icons/fa';
import '../Styles/Movies.css';
import { useNavigate } from "react-router-dom";
import PaginationBar from '../Components/PaginationBar';
// ✅ If you have PaginationBar component, import it here
 

// TV SHOWS DATA
const allTvShows = [
  { title: "BREAKING BAD", image: "Images/b2.jpg" },
  { title: "FAST & FURIOUS", image: "Images/f.webp" },
  { title: "BIGBOSS", image: "Images/b3.jpg" },
  { title: "STRANGER THINGS", image: "Images/ss1.jpg" },
  { title: "ISMART JODI", image: "Images/jo.jpg" },
  { title: "MAHA BHARATH", image: "Images/ma.jpg" },
  { title: "RANA NAIDU", image: "Images/ra.webp" },
];

const TvShows = () => {
  const navigate = useNavigate();

  // ✅ State for search
  const [category, setCategory] = useState("TV SHOWS");
  const [query, setQuery] = useState("");

  // ✅ Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [showsPerPage, setShowsPerPage] = useState(20);
  const totalShows = allTvShows.length;
  const totalPages = Math.ceil(totalShows / showsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    console.log("Go to page:", page);
  };

  // ✅ Slugify utility for clean URLs
  const slugify = (title) =>
    title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

  // ✅ Filter TV Shows based on search
  const filteredShows = allTvShows.filter((show) =>
    show.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <Header />

      {/* 🔹 SEARCH BAR SECTION */}
      <div className="search-bar-container">
        <div className="search-bar">
          <div className="dropdown-wrapper">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="search-dropdown"
            >
              <option value="TV SHOWS">TV SHOWS</option>
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

      {/* 🔹 TV SHOWS SECTION */}
      <section className='moviepage'>
        <div className='moviesheading'>
          <h1>TV SHOWS</h1>
          <p>
            <a href="/home">HOME</a> <span><FaAngleRight /></span> TV SHOWS
          </p>
        </div>

        <div className='totalmovies'>
          <div className='foundtotal'>
            <p>Found <span>{filteredShows.length} TV Shows</span> in total</p>
            <p>Sort by:</p>
          </div>
          <form action="" method='post'>
            <select name='selection'>
              <option value="popularity descending">Popularity Descending</option>
              <option value="popularity ascending">Popularity Ascending</option>
              <option value="rating descending">Rating Descending</option>
              <option value="rating ascending">Rating Ascending</option>
              <option value="release asc">Release Date Ascending</option>
              <option value="release desc">Release Date Descending</option>
            </select>
          </form>
        </div>

        <div className='allcards'>
          {filteredShows.map((show, index) => (
            <div className="movie-card" key={index}>
              <div
                className="hover-container"
                onClick={() => navigate(`/tvshows/${slugify(show.title)}`)}
                style={{ cursor: "pointer" }}
              >
                <img src={show.image} alt={show.title} />
                <div className="overlay">
                  <button className="hover-button">Read More</button>
                </div>
              </div>
              <h5>{show.title}</h5>
            </div>
          ))}
        </div>

        {/* ✅ OPTIONAL PAGINATION BAR (Only if you have the component) */}
         
       < PaginationBar
          currentPage={currentPage}
          totalPages={totalPages}
          moviesPerPage={showsPerPage}
          setMoviesPerPage={setShowsPerPage}
          handlePageChange={handlePageChange}
        /> 
        
      </section>

      <Footer />
    </div>
  );
};

export default TvShows;