import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Mains from "./Mains";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/form/:id" element={<Mains />} />
      </Routes>
    </Router>
  );
}

export default App;