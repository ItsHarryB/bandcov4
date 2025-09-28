import React from "react";
import Social from "./Social.jsx";
import "../styles/global.css"; // Make sure global.css is imported

export default function Footer() {
  return (
    <footer className="site-footer">
      {/* Sitemap link for crawlers */}
      <link rel="sitemap" href="/sitemap-index.xml" />

      <div className="footer-container">
        {/* Left Column: Copyright */}
        <div className="footer-section footer-left">
          <p>
            &copy; {new Date().getFullYear()} TEST: Brighton and Co. <br />
            All rights reserved.
          </p>
        </div>

        {/* Middle Column: Social Links */}
        <div className="footer-section footer-middle">
          <h4>Follow Me:</h4>
          <div className="social-links">
            <Social platform="Twitter" username="ItsHarryB" />
            <Social platform="GitHub" username="ItsHarryB_" />
            <Social
              platform="LinkedIn"
              url="https://www.linkedin.com/in/harry-brighton-8a2b971a4/"
            />
          </div>
        </div>

        {/* Right Column: Sitemap */}
        <div className="footer-section footer-right">
          <h4>Quick Links:</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/enquiries/">Enquiries</a></li>
            <li><a href="/about/">About Me</a></li>
            <li><a href="/blog/">Blog</a></li>
            <li><a href="/photography/">Photography</a></li>
            <li><a href="/links/">Links</a></li>
          </ul>
        </div>
      </div>

      {/* Footer Meta */}
      <div className="footer-meta">
        <p>
          TEST: Brighton and Co Website – Made by Harry Brighton | Version 0.2.1 / 28/09/2025
        </p>
      </div>
    </footer>
  );
}
