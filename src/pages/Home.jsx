import React, { useEffect } from "react";
import "../styles/Home.css";

const Home = () => {
  // Smooth fade animation on scroll
  useEffect(() => {
    const sections = document.querySelectorAll(".fade-in");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 }
    );
    sections.forEach((sec) => observer.observe(sec));
  }, []);

  // Smooth scroll to courses
  const scrollToCourses = () => {
    const section = document.querySelector("#courses");
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="home-container">
      {/* ======================= HERO SECTION ======================= */}
      <section className="hero-section fade-in">
        <div className="hero-content">
          <img src="/logo.png" alt="Dream Traders Logo" className="hero-logo" />
          <h1 className="hero-title">
            Welcome to <span>Dream Traders</span>
          </h1>
          <p className="hero-subtitle">
            Learn, Trade & Grow — from Beginner to Advanced Level with Live
            Market Experience.
          </p>
          <a href="/courses" className="hero-btn">
            Explore Courses
          </a>

        </div>
      </section>

      {/* ======================= COURSES SECTION ======================= */}
      <section className="courses-section fade-in" id="courses">
        <h2 className="section-title">What You’ll Learn</h2>
        <p className="section-subtitle">
          From foundational market knowledge to advanced trading strategies.
        </p>

        <div className="courses-grid">
          {[
            "Stock Market Basics",
            "Candlestick Chart Patterns",
            "Fundamental Analysis",
            "Technical Analysis",
            "Price Action",
            "Nifty & BankNifty",
            "Futures & Options (F&O)",
            "Intraday & Swing Trading",
            "Scalping",
            "Smart Money Concept",
            "Advance ICT Concept",
            "Forex Trading",
            "Risk Management",
            "Trading Psychology",
            "Long-Term Investment Strategies",
            "Technical Indicators & Chart Reading",
          ].map((course, index) => (
            <div key={index} className="course-card">
              <span className="course-icon">📊</span>
              <p>{course}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ======================= WHY CHOOSE SECTION ======================= */}
      <section className="why-section fade-in">
        <h2 className="section-title">Why Choose Dream Traders?</h2>
        <ul className="why-list">
          <li>Beginner to Advanced Level Training</li>
          <li>Live Market Sessions</li>
          <li>Personal Mentorship & Support</li>
          <li>Technical & Fundamental Analysis</li>
          <li>Perfect for Students, Professionals & Investors</li>
        </ul>
      </section>

      {/* ======================= INSTAGRAM / QR SECTION ======================= */}
      <section className="social-section fade-in">
        <h2 className="section-title">Join Our Community</h2>
        <p className="section-subtitle">
          Stay updated with trading insights, live classes, and expert sessions.
        </p>

        <div className="social-content">
          <img
            src="/qr.png"
            alt="Dream Traders Instagram QR"
            className="qr-image"
          />
          <p className="qr-handle">@dreamtraders.in</p>
          <a
            href="https://www.instagram.com/dreamtraders.in"
            target="_blank"
            rel="noopener noreferrer"
            className="follow-btn"
          >
            Follow on Instagram
          </a>
        </div>
      </section>

      {/* ======================= CTA SECTION ======================= */}
      <section className="cta-section fade-in">
        <h2 className="cta-title">Start Your Trading Journey Today</h2>
        <p className="cta-subtitle">
          Join India’s most trusted trading institute and unlock your financial
          growth potential.
        </p>
        <a href="/contact" className="cta-btn">
          Join Our Classes
        </a>
      </section>
    </main>
  );
};

export default Home;
