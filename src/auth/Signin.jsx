import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import '../styles/signin.css';
import { useState } from 'react';

const signinSchema = z.object({
    email: z.string().email('Invalid email address').nonempty('Email is required'),
    password: z.string().nonempty('Password is required'),
});

function Signin() {

  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({resolver: zodResolver(signinSchema)});

  const navigate = useNavigate();

  const onSignInFormSubmit = async (data) => {

    console.log(data);
    try {
      const response = await fetch('http://localhost:3000/auth/signin' , {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify(data), // convert object data into string text format
      });

      if (!response.ok) {
        throw new Error(`Server returned status: ${response.status}`);
      }

      const result = await response.json();
      // console.log('Success', result);
      
      navigate('/');

    } catch(error) {
      console.error('Submission Error:', error);
    }
  }
  
    return (
    <>
      <div className="signin-page">
      <div className="signin-container">
        <form className="signin-form" onSubmit={handleSubmit(onSignInFormSubmit)}>

          <div className="signin-logo"> Movie<span>Box</span> </div>

          <h2>Welcome Back</h2>
          <p className="signin-subtitle"> Sign in to continue booking your favorite movies. </p>

          <div className="input-group">
            <label htmlFor="email"> Email Address</label>
            <input 
            type="email" 
            id="email" 
            placeholder="Enter your email" 
            className={errors.email ? "input-error" : ""}
            {...register('email')}
            />
            {errors.email && <span  className="validation-error"> {errors.email.message} </span>}
          </div>

          <div className="input-group">
            <label htmlFor="password"> Password </label>
            <div className="password-wrapper"> 
            <input 
            type={showPassword ? "text" : "password"}
            id="password" 
            placeholder="Enter your password" 
            className={errors.password ? "input-error" : ""}
           {...register('password')}  
            />
             <button 
              type="button" 
              className="password-toggle" onClick={() => setShowPassword(!showPassword)} 
              aria-label={ showPassword ? "Hide password" : "Show password" } > 
              <i className={ showPassword ? "bi bi-eye-slash" : "bi bi-eye" } > </i> 
              </button>
            </div>
            {errors.password && <span className="validation-error"> {errors.password.message} </span>}
          </div>

          <div className="signin-links">
            <Link to="/forgot-password" className="forgot-link"> Forgot Password? </Link>
          </div>

          <button type="submit" className="signin-btn"> Sign In </button>

          <div className="signin-divider">
            <span></span>
            <p>OR</p>
            <span></span>
          </div>

          <p className="signup-text">  Don't have an account?
            <Link to="/signup"> Sign Up </Link>
          </p>

        </form>
        
      </div>
    </div>
    </>
  );
}

export default Signin;