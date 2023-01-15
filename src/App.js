import "./styles.css";
import SignUp from "./components/Signup/SignUp";
import { Routes, Route } from "react-router-dom";

import Welcome from "./components/Welcome";
import Profile from "./components/profile/profile";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/updateprofile" element={<Profile />} />
      </Routes>
    </div>
  );
}
