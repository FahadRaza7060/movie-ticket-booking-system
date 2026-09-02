import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import "../styles/card.css";

function Card() {

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const backendURL = "http://localhost:3000/auth/movies";

    fetch(backendURL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("failed to fetch movie from the backend");
        }

        return response.json();
      })
      .then((data) => {
        setMovies(data);
        setLoading(false);
      })
      .catch((err) => {
        // Caught and stored the error so the UI can display it
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading movies from the backend...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <>
      <div className="movies-section">
        <div className="container-fluid py-5">
          <h1 className="text-start text-white mb-5">All Movies</h1>

          <div className="row g-4">
            {movies.map((movie) => (
              <div
                key={movie.id || movie._id}
                className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2"
              >
                <div className="card h-100 movie-card">
                  <img
                    // src={`http://localhost:3000${movie.poster}`}
                    src={movie.poster || movie.image}
                    className="card-img-top"
                    alt={movie.title || movie.movieTitle || movie.name}
                  />

                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">
                      {movie.movieTitle || movie.title || movie.name}
                    </h5>

                    <p className="card-text">{movie.description}</p>

                    <Link to={`/select-seat/${movie.id || movie._id}`} className="btn btn-danger">
                      Book Tickets
                    </Link>

                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;