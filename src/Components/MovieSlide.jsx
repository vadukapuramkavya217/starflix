import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import { FaStar, FaPlay, FaHeart, FaShareAlt } from 'react-icons/fa';
import '../Styles/MovieSlide.css';
import { useNavigate } from "react-router-dom";

const movies = [
  {
    title: "MAD SQUARE",
    genres: ["DRAMA", "COMEDY"],
    description:
      "Mad Square is a Telugu movie starring Narne Nithin, Sangeeth Shobhan, Ram Nithin and Priyanka Jawalkar in prominent roles. It is written and directed by Kalyan Shankar.",
    rating: "8.4",
    time: "2h 7mins",
    certified: "UA16+",
    img: "/Images/mad.png",
  },
  {
    title: "CHHAAVA",
    genres: ["HISTORICAL", "ACTION", "DRAMA"],
    description:
      "After Chhatrapati Shivaji Maharaj's death, the Mughals aim to expand into the Deccan, only to face his fearless son, Sambhaji Maharaj.",
    rating: "9.2",
    time: "2h 41mins",
    certified: "UA16+",
    img: "/Images/chhaava.png",
  },
  {
    title: "WARFARE",
    genres: ["WAR", "DRAMA", "ACTION"],
    description:
      "Warfare embeds audiences with a platoon of Navy SEALs on a surveillance mission gone wrong in insurgent territory.",
    rating: "8.4",
    time: "1h 38mins",
    certified: "A",
    img: "/Images/warfare.jpg",
  },
];

const MovieSlide = () => {
  const navigate = useNavigate();

  // Utility to convert title to URL-friendly slug
  const slugify = (title) =>
    title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

  return (
    <div
      className="movie-slide-wrapper"
      style={{ backgroundImage: "url('/Images/login-bg.png')" }}
    >
      <div className="overlay-content">
        <Carousel indicators={false} controls={true}>
          {movies.map((movie, index) => (
            <Carousel.Item key={index}>
              <div className="slide-content">
                {/* Left Section */}
                <div className="slide-left">
                  <div className="badges">
                    {movie.genres.map((genre, i) => (
                      <span
                        key={i}
                        className={`badge genre-${genre.toLowerCase()}`}
                      >
                        {genre}
                      </span>
                    ))}
                  </div>

                  <h1><b>{movie.title}</b></h1>
                  <p className="description">{movie.description}</p>

                  <div className="buttons">
                    <Button
                      variant="outline-info"
                      onClick={() => navigate(`/movies/${slugify(movie.title)}`)}
                      style={{ cursor: "pointer" }}
                    >
                      <FaPlay /> WATCH TRAILER
                    </Button>

                    <Button variant="outline-info">
                      <FaHeart /> ADD TO FAVORITE
                    </Button>

                    <Button variant="outline-info">
                      <FaShareAlt /> SHARE
                    </Button>
                  </div>

                  <div className="meta">
                    <span className="rating">
                      <FaStar color="#f9d342" /> {movie.rating}/10
                    </span>
                    <span> · Run Time: {movie.time}</span>
                    <span> · {movie.certified}</span>
                  </div>

                  <Button
                    className="detail-btn"
                    variant="info"
                    onClick={() => navigate(`/movies/${slugify(movie.title)}`)}
                    style={{ cursor: "pointer" }}
                  >
                    MORE DETAIL
                  </Button>
                </div>

                {/* Right Section */}
                <div
                  className="slide-right"
                  onClick={() => navigate(`/movies/${slugify(movie.title)}`)}
                  style={{ cursor: "pointer" }}
                >
                  <img src={movie.img} alt={movie.title} />
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default MovieSlide;