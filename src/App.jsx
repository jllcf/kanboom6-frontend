import { useState } from "react";
import "./App.css";

import Signup from "./pages/signup/signup";
import Login from "./pages/login/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [user, setUser] = useState(null);
  return (
    <Router>
      <Routes>
        <Route exact path="/cadastro" element={<Signup user={user} setUser={setUser} />} />
        <Route exact path="/login" element={<Login user={user} setUser={setUser} />} />
      </Routes>
    </Router>
  );
}

export default App;
