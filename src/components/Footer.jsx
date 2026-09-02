import "../styles/footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row gy-4">

          {/* Brand */}
          <div className="col-lg-4 col-md-6">
            <h3 className="footer-logo">
              🎬 Movie<span>Box</span>
            </h3>
            <p className="footer-text">
              Experience the magic of cinema. Discover trending movies,
              book tickets effortlessly, and enjoy your favorite films
              with MovieBox.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6">
            <h5>Quick Links</h5>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/movies">Movies</a></li>
              <li><a href="">About</a></li>
              <li><a href="">Contact</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-lg-3 col-md-6">
            <h5>Support</h5>
            <ul className="footer-links">
              <li><a href="/faq">FAQ</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/terms">Terms & Conditions</a></li>
              <li><a href="/help">Help Center</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-lg-3 col-md-6">
            <h5>Contact Us</h5>
            <p>📍 Lahore, Pakistan</p>
            <p>📧 support@moviebox.com</p>
            <p>📞 +92 300 7456997</p>

            <div className="social-icons">
              <a href="#"><i className="bi bi-facebook"></i></a>
              <a href="#"><i className="bi bi-instagram"></i></a>
              <a href="#"><i className="bi bi-twitter-x"></i></a>
              <a href="#"><i className="bi bi-youtube"></i></a>
            </div>
          </div>

        </div>

        <hr />

        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} MovieBox. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;