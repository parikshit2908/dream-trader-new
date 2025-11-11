import React, { useState, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/login.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ✅ useCallback prevents recreation unless dependencies change
  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    // Simple validation
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    // Demo user authentication
    if (email === "mritunjay@example.com" && password === "123456") {
      const userData = { name: "MRITUNJAY", email };
      localStorage.setItem("user", JSON.stringify(userData));

      setSuccess("Login successful! Redirecting...");
      setError("");

      // Redirect to homepage after short delay
      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 1200);
    } else {
      setError("Invalid credentials. Try again!");
      setSuccess("");
    }
  }, [email, password, navigate]);

  // ✅ Simple handlers - direct setState is fine for input changes
  const handleEmailChange = useCallback((e) => {
    setEmail(e.target.value);
  }, []);

  const handlePasswordChange = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  return (
    <main className="login-page">
      <div className="login-card fade-in">
        <h1 className="login-title">Welcome Back</h1>
        <p className="login-subtitle">Log in to access your dashboard</p>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="mritunjay@example.com"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>

          <button type="submit" className="login-btn">
            Log In
          </button>

          <p className="login-footer">
            Don't have an account?{" "}
            <Link to="/signup" className="signup-link">
              Sign up here
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Login;