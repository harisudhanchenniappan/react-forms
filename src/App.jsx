import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import CreateForm from "./components/CreateForm";
import SubmitForm from "./components/SubmitForm";
import Responses from "./components/Responses";
import All from "./components/All";

function App() {
  return (
    <div>
      <All />
    </div>
  );
}

export default App;
