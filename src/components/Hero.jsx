import "../styles/hero.css";
import heroImage from "../assets/movie-hero-image.jpg";

function Hero() {
  return (
    <section className="hero" style={{ backgroundImage: `url(${heroImage})`, width: '100%', height: '900px' }}>
      <div className="overlay">
        <div className="hero-content">
          <h1>Unlimited Movies, TV Shows & More</h1>

          <p>
            Watch the latest blockbusters anytime,
            anywhere.
          </p>

          <button className="watch-btn">
            ▶ Watch Now
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;