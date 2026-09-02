import { useNavigate } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
  
  const navigate = useNavigate();

  const handleGotoSignUp = () => {
    navigate('/signup');
  }

  return (
    <nav className="navbar">
      <div className="logo">
        🎬 Movie<span>Box</span>
      </div>

      <button className="navbar-signup-btn" onClick={handleGotoSignUp} >
        SignUp
      </button>
    
    </nav>
  );
}

export default Navbar;