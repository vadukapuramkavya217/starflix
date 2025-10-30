import Header from "../Components/Header";
import Movies from "./Movies";
import MovieDetails from "./MovieDetails";
import Footer from "../Components/Footer";
import MovieSlide from "../Components/MovieSlide";
import HomeMovies from "../Components/HomeMovies";
import YoutubeFrames from "../Components/YoutubeFrames"; // ✅ fixed import name
import PaginationBar from "../Components/PaginationBar";

function Home({ setToken }) {
  return (
    <div>
      <Header />
      <MovieSlide />
      <HomeMovies />
      <YoutubeFrames /> {/* ✅ matches import name */}
      <Footer />
    
    </div>
  );
}

export default Home;
