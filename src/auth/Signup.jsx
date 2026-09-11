import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import "../styles/signup.css";

// ----- zod is used for validations. Here is zod form schema define -----
const signupSchema = z.object({
  fullName: z.string().nonempty('Name is required').min(3,"Minimum length should be 3").max(20,"Maximum length should be 20"),
  email: z.email("Email is invalid"),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Confirm Password must be at least 6 characters'),
}).refine((data) => data.password === data.confirmPassword, {
  path: ['confirmPassword'],
  message: "Passwords do not match",
});

function Signup() {

  const [showPassword, setShowPassword] = useState(false); 
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({resolver: zodResolver(signupSchema)});

  const navigate = useNavigate();
  
  const onSignUpFormSubmit = async (data) => {

    // console.log(data);

    try {
      const response = await fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(data), // convert object data into string text format
      });

      if (!response.ok) {
        throw new Error(`Server returned status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Success", result);

      navigate('/signin');

    } catch (error) {
      console.error("Submission Error:", error);
    }
  };

  return (
    <>
      <div className="signup-page">
        <div className="signup-overlay"></div>

        <div className="signup-container">
          <form className="signup-form" onSubmit={handleSubmit(onSignUpFormSubmit)} noValidate>
            <div className="signup-logo">
              Movie<span>Box</span>
            </div>

            <h2>Create Account</h2>

            <p className="signup-subtitle">
              Create your account and start booking your favorite movies.
            </p>

            <div className="input-group">
              <label htmlFor="fullName">Full Name</label>
              <input 
              type="text" 
              id="fullName" 
              placeholder="Enter your full name" 
              className={errors.fullName ? "input-error" : ""}
              {...register('fullName')} />
               {errors.fullName && <span className="validation-error"> {errors.fullName.message} </span>}
            </div>

            <div className="input-group">
              <label htmlFor="email">Email Address</label>
              <input 
              type="email" 
              id="email" 
              placeholder="Enter your email"
              className={errors.email ? "input-error" : ""}
              {...register('email')} />
              {errors.email && <span className="validation-error"> {errors.email.message} </span>}
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <div className="password-wrapper"> 
              <input 
              type={showPassword ? "text" : "password"} 
              id="password" 
              placeholder="Create a password"
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

             <div className="input-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="password-wrapper"> 
              <input 
              type={showConfirmPassword ? "text" : "password"} 
              id="confirmPassword" 
              placeholder="Confirm Password"
              className={errors.confirmPassword ? "input-error" : ""}
              {...register('confirmPassword')}  
              />
              <button 
              type="button" 
              className="password-toggle" onClick={() => setShowConfirmPassword(!showConfirmPassword) } 
              aria-label={ showConfirmPassword ? "Hide confirm password" : "Show confirm password" } > 
              <i className={ showConfirmPassword ? "bi bi-eye-slash" : "bi bi-eye" } > </i> 
              </button>
              </div>
              {errors.confirmPassword && <span className="validation-error"> {errors.confirmPassword.message} </span>}
            </div>

            <button type="submit" className="signup-btn"> Create Account </button>

            <div className="signup-divider">
              <span></span>
              <p>OR</p>
              <span></span>
            </div>

            <p className="signin-text">
              Already have an account?
              <Link to="/signin">Sign In</Link>
            </p>
            
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;