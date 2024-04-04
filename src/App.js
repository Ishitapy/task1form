import React from "react";
import Form from "./components/Form";
import Home from "./components/Home";
import Summary from "./components/Summary";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/form" element={<Form />} />
          <Route path="/" element={<Home />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/Form/edit/:index" element={<Form />} />
        </Routes>
      </Router>
    </>
  );
}
