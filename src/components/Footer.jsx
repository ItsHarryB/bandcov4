import React from "react";
import Social from "./Social.jsx";
import ThemeIcon from "./ThemeIcon.jsx"; // Import your toggle
import "../styles/global.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      {/* Sitemap link */}
      <link rel="sitemap" href="/sitemap-index.xml" />

      <div className="footer-container">
        {/* Left section */}
        <div className="footer-section footer-left">
          <p>
            &copy; {new Date().getFullYear()} TEST: Brighton and Co. <br />
            All rights reserved.
          </p>
        </div>

        {/* Middle section: Social icons */}
        <div className="footer-section footer-middle">
          <h4>Follow Me:</h4>
          <div className="social-links">
            <Social platform="Twitter" username="ItsHarryB_" iconOnly />
            <Social platform="GitHub" username="ItsHarryB" iconOnly />
            <Social
              platform="LinkedIn"
              url="https://www.linkedin.com/in/harry-brighton-8a2b971a4/"
              iconOnly
            />
          </div>
        </div>

        {/* Right section: Quick links */}
        <div className="footer-section footer-right">
          <h4>Quick Links:</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/enquiries/">Enquiries</a></li>
            <li><a href="/about-me/">About Me</a></li>
            <li><a href="/blog/">Blog</a></li>
            <li><a href="/photography/">Photography</a></li>
            <li><a href="/links/">Links</a></li>
          </ul>
        </div>
      </div>

      {/* Theme toggle centered below the columns */}
      <div className="footer-toggle">
        <h4>Toggle Theme:</h4>
        <ThemeIcon client:load />
      </div>

      {/* Footer meta */}
      <div className="footer-meta">
        <p>
          TEST: Brighton and Co Website – Made by Harry Brighton | Version 0.8.1 - 01/11/2025
        </p>
      </div>
    </footer>
  );
}
