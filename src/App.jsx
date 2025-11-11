import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import LiveClasses from "./pages/LiveClasses";
import MarketsAndPaperTrading from "./pages/MarketsAndPaperTrading";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/login";
import Signup from "./pages/Signup";
import Testimonials from "./pages/Testimonials";
import Footer from "./components/Footer";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/live-classes" element={<LiveClasses />} />
            <Route path="/markets" element={<MarketsAndPaperTrading />} />
            <Route path="/paper-trading" element={<MarketsAndPaperTrading />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/testimonials" element={<Testimonials />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
