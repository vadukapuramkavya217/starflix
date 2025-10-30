import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../Styles/HomeMovies.css";
import { movies, TvShows } from "../../src/Components/MovieData"; // ✅ Make sure names match exactly

const HomeMovies = () => {
  const [selectedLang, setSelectedLang] = useState("ENGLISH");
  const navigate = useNavigate();

  const languages = ["ENGLISH", "HINDI", "TELUGU", "TAMIL", "MALAYALAM"];

  const filteredMovies = movies.filter(
    (movie) => movie.language === selectedLang
  );

  const slugify = (title) =>
    title.toLowerCase().replace(/[\s:]+/g, "-").replace(/[^a-z0-9-]/g, "");

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 4 } },
      { breakpoint: 992, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="home-movies-container">
      {/* Movies Section */}
      <div className="movie-slider">
        <div className="movieshead">
          <h4>
            <b>MOVIES</b>
          </h4>
          <a href="/movies">
            <b>VIEW ALL</b> <FaArrowRight />
          </a>
        </div>

        <ul className="language-filter">
          {languages.map((lang) => (
            <li key={lang}>
              <button
                className={selectedLang === lang ? "active-language" : ""}
                onClick={() => setSelectedLang(lang)}
              >
                {lang}
              </button>
            </li>
          ))}
        </ul>

        <Slider {...sliderSettings}>
          {filteredMovies.map((movie, index) => (
            <div className="movie-cards" key={index}>
              <div
                className="hover-container"
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/movies/${slugify(movie.title)}`)} // ✅ fixed
              >
                <img src={movie.image} alt={movie.title} />
                <div className="overlay">
                  <button className="hover-button">Read More</button>
                </div>
              </div>
              <h5>{movie.title}</h5>
            </div>
          ))}
        </Slider>
      </div>

      {/* TV Shows Section */}
      <div className="movie-slider">
        <div className="movieshead tvshows">
          <h4>
            <b>POPULAR TV SHOWS</b>
          </h4>
          <a href="/tvshows">
            <b>VIEW ALL</b> <FaArrowRight />
          </a>
        </div>

        <Slider {...sliderSettings}>
          {TvShows.map((show, index) => (
            <div className="movie-cards" key={index}>
              <div
                className="hover-container"
                style={{ cursor: "pointer" }}
               onClick={() => navigate(`/tvshows/${slugify(show.title)}`)}

              >
                <img src={show.image} alt={show.title} />
                <div className="overlay">
                  <button className="hover-button">Read More</button>
                </div>
              </div>
              <h5>{show.title}</h5>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default HomeMovies;