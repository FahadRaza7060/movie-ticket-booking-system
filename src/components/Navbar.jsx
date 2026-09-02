import { useNavigate } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const handleGotoHome = () => {
    navigate("/");
  };

  const handleGotoSignUp = () => {
    navigate("/signup");
  };

  const handleMyBookings = () => {
    navigate("/mytickets");
  };

  return (
    <nav className="navbar">

      {/* Logo */}
      <div className="logo" onClick={handleGotoHome}>
        🎬 Movie<span>Box</span>
      </div>

      {/* Right Side Buttons */}
      <div className="navbar-buttons">

        <button
          className="navbar-bookings-btn"
          onClick={handleMyBookings}
        >
          My Bookings
        </button>

        <button
          className="navbar-signup-btn"
          onClick={handleGotoSignUp}
        >
          Sign Up
        </button>

      </div>

    </nav>
  );
}

export default Navbar;