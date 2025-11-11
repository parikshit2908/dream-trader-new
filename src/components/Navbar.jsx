import React, { useState, useCallback, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sun, Moon, LogIn, User } from "lucide-react";
import "../styles/Navbar.css";

const Navbar = React.memo(() => {
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return savedTheme ? savedTheme === "dark" : prefersDark;
  });

  const [loggedIn] = useState(false);
  const [userName] = useState("MRITUNJAY SINGH");

  useEffect(() => {
    document.body.setAttribute("data-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const toggleTheme = useCallback(() => {
    const newTheme = darkMode ? "light" : "dark";
    setDarkMode(!darkMode);
    document.body.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  }, [darkMode]);

  return (
    <header className={`navbar ${darkMode ? "dark" : "light"}`}>
      <div className="navbar-container">
        {/* ✅ Logo & Brand */}
        <Link to="/" className="navbar-logo">
          <img src="/logo.png" alt="Dream Traders Logo" className="logo-img" />
          <h1 className="brand-name">
            <span className="brand-blue">DREAM</span> TRADERS
          </h1>
        </Link>

        {/* ✅ Nav Links */}
        <nav className="nav-links">
          {[
            { path: "/", label: "Home" },
            { path: "/markets", label: "Markets" },
            { path: "/courses", label: "Courses" },
            { path: "/live-classes", label: "Live Classes" },
            { path: "/about", label: "About" },
            { path: "/contact", label: "Contact" },
          ].map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={location.pathname === path ? "active" : ""}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* ✅ Right Section */}
        <div className="nav-actions">
          <button onClick={toggleTheme} className="theme-btn" aria-label="Toggle Theme">
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {loggedIn ? (
            <div className="user-name">
              <User size={16} /> {userName}
            </div>
          ) : (
            <Link to="/login" className="login-btn">
              <LogIn size={16} /> Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
});

Navbar.displayName = "Navbar";
export default Navbar;
