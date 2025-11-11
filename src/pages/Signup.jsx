import React, { useState, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Signup.css";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    // Simple validation
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Demo registration success
    const userData = { name, email };
    localStorage.setItem("user", JSON.stringify(userData));

    setSuccess("Signup successful! Redirecting...");
    setError("");

    setTimeout(() => {
      navigate("/");
      window.location.reload();
    }, 1200);
  }, [name, email, password, confirmPassword, navigate]);

  // ✅ Optimized change handlers
  const handleNameChange = useCallback((e) => setName(e.target.value), []);
  const handleEmailChange = useCallback((e) => setEmail(e.target.value), []);
  const handlePasswordChange = useCallback((e) => setPassword(e.target.value), []);
  const handleConfirmPasswordChange = useCallback((e) => setConfirmPassword(e.target.value), []);

  return (
    <main className="signup-page">
      <div className="signup-card fade-in">
        <h1 className="signup-title">Create Account</h1>
        <p className="signup-subtitle">Join Dream Traders today</p>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={handleNameChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
          </div>

          <button type="submit" className="signup-btn">
            Sign Up
          </button>

          <p className="signup-footer">
            Already have an account?{" "}
            <Link to="/login" className="login-link">
              Log in here
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Signup;