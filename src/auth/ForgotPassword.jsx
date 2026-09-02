import { useNavigate, Link } from "react-router-dom";
import '../styles/ForgotPassword.css';

function ForgotPassword() {
  
  const navigate = useNavigate();

  const onResetPassword = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const allFormValues = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('http://localhost:3000/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        
        body: JSON.stringify(allFormValues),
      });

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      await response.json();
      
      navigate("/signin");

    } catch(error) {
      console.error('Submission Error:', error);
    }
  };

  return (
    <div className="forgot-page">

      <div className="forgot-container">

        <form className="forgot-form" onSubmit={onResetPassword} >

          <div className="forgot-logo">  Movie<span>Box</span> </div>

          <h2>Reset Password</h2>
          <p className="forgot-subtitle"> Enter your email and create a new password for your account. </p>

          <div className="forgot-input-group">
            <label htmlFor="email"> Email Address </label>
            <input type="email" id="email" name="email" placeholder="Enter your email" required />
          </div>

          <div className="forgot-input-group">
            <label htmlFor="password"> New Password </label>
            <input type="password" id="password" name="password" placeholder="Enter new password" required />
          </div>

          <div className="forgot-input-group">
            <label htmlFor="cpassword"> Confirm Password </label>
            <input type="password" id="cpassword" name="confirmPassword" placeholder="Confirm your new password" required />
          </div>

          <button type="submit" className="reset-btn"> Reset Password </button>

          <p className="back-signin-text"> Remember your password? <Link to="/signin"> Back to Sign In </Link> </p>

        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;