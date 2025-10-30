import React from "react";
import { BrowserRouter as BrowserRouter, Routes, Route } from "react-router-dom"; 
 // ✅ Include your Header
import Landing from "./Pages/Landing";
import Movies from "./Pages/Movies";
import Home from "./Pages/Home";
import MovieDetails from "./Pages/MovieDetails";
import TvShows from "./Pages/TvShows";
import Profile from './Pages/Profile';
import Newpopular from "./Pages/NewPopular";
import HomeMovies from "./Components/HomeMovies";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";


function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/movies" element={<Movies/>} />
        <Route path="/movies/:slug" element={<MovieDetails />} />

        {/* tv shows */}
        <Route path="/tvshows" element={<TvShows />} />
         <Route path="/tvshows/:slug" element={<MovieDetails />} />

        {/* profile */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/Popular" element={<Newpopular />} />
        <Route path="/Movies" element={<HomeMovies />} />
       


        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
