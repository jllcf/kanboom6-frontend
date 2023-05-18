import { useState } from "react";
import "./App.css";

import Signup from "./pages/signup/signup";

function App() {
  const [user, setUser] = useState(null);
  return (
    <>
      <Signup user={user} setUser={setUser} />
    </>
  );
}

export default App;
