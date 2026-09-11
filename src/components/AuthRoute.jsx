import { Navigate } from "react-router-dom";

function AuthRoute({ children }) {
    
  const token = localStorage.getItem("accessToken");

  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}

export default AuthRoute;