import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./auth/Signup";
import Signin from "./auth/Signin";
import ForgotPassword from "./auth/ForgotPassword";
import LandingPage from "./components/LandingPage";
import Card from "./components/Card";
import SeatSelection from "./components/SeatSelection";
import MyTickets from "./components/MyTickets";
import PublicRoute from "./components/PublicRoute";
import AuthRoute from "./components/AuthRoute";

function App() {
  return (
    <> 
    <BrowserRouter>
      <Routes>
        {/* <Route path="/movies" element={<Card />} /> */}
        
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={
          <PublicRoute>
            <Signin />
          </PublicRoute>
        } />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/" element={
          <AuthRoute>
            <LandingPage />
          </AuthRoute>
        } />
        <Route path="/mytickets" element={
          <AuthRoute>
            <MyTickets />
          </AuthRoute>
        } />  
        <Route path="/select-seat/:movieId" element={<SeatSelection /> } />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;