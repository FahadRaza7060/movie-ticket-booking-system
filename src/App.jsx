import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./auth/Signup";
import Signin from "./auth/Signin";
import ForgotPassword from "./auth/ForgotPassword";
import LandingPage from "./components/LandingPage";
import Card from "./components/Card";
import SeatSelection from "./components/SeatSelection";

function App() {
  return (
    <> 
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/movies" element={<Card />} />
        <Route path="/select-seat/:movieId" element={<SeatSelection /> } />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;