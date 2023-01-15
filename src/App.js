import "./styles.css";
import SignUp from "./components/Signup/SignUp";
import { Routes, Route } from "react-router-dom";

import Welcome from "./components/Welcome";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/welcome" element={<Welcome />} />
      </Routes>
    </div>
  );
}
