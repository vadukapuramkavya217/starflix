import Header from "../Components/Header";
import Footer from "../Components/Footer";
import MovieSlide from "../Components/MovieSlide";
import HomeMovies from "../Components/HomeMovies";
import YoutubeFrames from "../Components/YoutubeFrames"; // ✅ fixed import name


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
