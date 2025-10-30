import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { movies, TvShows } from "../Components/MovieData";
import "../Styles/MovieDetails.css";
import Header from "../Components/Header";
import { FaSearch } from "react-icons/fa"; // ✅ import FaSearch

const slugify = (title) =>
  title.toLowerCase().replace(/[\s:]+/g, "-").replace(/[^a-z0-9-]/g, "");

const MovieDetails = () => {
  const { slug } = useParams();
  const location = useLocation();

  // Look in both movies and TvShows
  const item =
    location.state?.movie ||
    movies.find((m) => slugify(m.title) === slug) ||
    TvShows.find((t) => slugify(t.title) === slug);

  const [activeTab, setActiveTab] = useState("Overview");

  // ✅ Add state for search bar
  const [category, setCategory] = useState("MOVIES");
  const [query, setQuery] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!item) {
    return (
      <div className="movie-not-found">
        <h2>Item Not Found</h2>
      </div>
    );
  }

  return (
    <>
      <Header />
      {/* 🔹 Search Bar */}
      <div className="search-bar-container">
        <div className="search-bar">
          <div className="dropdown-wrapper">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="search-dropdown"
            >
              <option value="MOVIES">Movies</option>
              <option value="TVSHOWS">TV Shows</option>
            </select>
          </div>
          <input
            type="text"
            placeholder={`Search for a ${category.toUpperCase()} or celebrity...`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input"
          />
          <button className="search-btn">
            <FaSearch />
          </button>
        </div>
      </div>

      <div
        className="iterate-banner"
        style={{ backgroundImage: `url(${item.image})` }}
      >
        <div className="iterate-content">
          <div className="movie-content">
            {/* Poster */}
            <div className="poster-div">
              <img src={item.image} alt={item.title} />
              {item.trailer && (
                <a
                  href={item.trailer}
                  className="btn-trl"
                  target="_blank"
                  rel="noreferrer"
                >
                  Watch Trailer
                </a>
              )}
              {item.buy && (
                <a
                  href={item.buy}
                  className="btn-tct"
                  target="_blank"
                  rel="noreferrer"
                >
                  Buy Tickets
                </a>
              )}
            </div>

            {/* Text Details */}
            <div className="poster-text">
              <h2>{item.title}</h2>

              <div className="ratingpara">
                {item.rating && <p>⭐ {item.rating}</p>}
                <span className="rating-star">|</span>
                {item.release && <p>{item.release}</p>}
              </div>

              {/* Tabs */}
              <div className="tabs">
                {["Overview", "Cast & Crew", "Reviews"].map((tab) => (
                  <span
                    key={tab}
                    className={activeTab === tab ? "active-tab" : ""}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </span>
                ))}
              </div>

              {/* Tab Content */}
              <div className="movie-dtl">
                {activeTab === "Overview" && (
                  <div className="overview">
                    {item.description && <p>{item.description}</p>}
                    {item.director && (
                      <p>
                        <strong>Director:</strong> {item.director}
                      </p>
                    )}
                    {item.genres && (
                      <p>
                        <strong>Genres:</strong>{" "}
                        {Array.isArray(item.genres)
                          ? item.genres.join(", ")
                          : item.genres}
                      </p>
                    )}
                    {item.release && (
                      <p>
                        <strong>Release:</strong> {item.release}
                      </p>
                    )}
                    {item.runtime && (
                      <p>
                        <strong>Runtime:</strong> {item.runtime}
                      </p>
                    )}
                  </div>
                )}

                {activeTab === "Cast & Crew" && item.cast && (
                  <div className="castcrew">
                    {item.cast.map((member, index) => (
                      <div className="cast-drt" key={index}>
                        {member.image && (
                          <img src={member.image} alt={member.name} width="50" />
                        )}
                        <div>
                          <h6>{member.name}</h6>
                          <p>{member.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "Reviews" && item.reviews && (
                  <div>
                    {item.reviews.map((review, index) => (
                      <div key={index} className="review">
                        <p>
                          ⭐ {review.rating}/5 - <strong>{review.user}</strong>
                        </p>
                        <p>{review.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {item.url && (
                <div className="trailer-wrapper">
                  <iframe
                    src={item.url}
                    title={item.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieDetails;