import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Mains from "./Mains";

function App() {
  return (
    <div>
    <Router>
      <Routes>
        <Route path="/form/:id" element={<Mains />} />
      </Routes>
      </Router>
      <Link to='/form/677528884fc0007a80dd91aa'>toooo</Link>
    </div>
    
  );
}

export default App;