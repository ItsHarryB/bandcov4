import React from "react";
import Social from "./Social.jsx";
import "../styles/global.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      {/* Sitemap */}
      <div className="footer-sitemap">
        <a href="/sitemap-index.xml">Sitemap</a>
      </div>

      {/* Social icons */}
      <div className="footer-social">
        <Social platform="Twitter" username="ItsHarryB" />
        <Social platform="GitHub" username="ItsHarryB_" />
        <Social
          platform="LinkedIn"
          url="https://www.linkedin.com/in/harry-brighton-8a2b971a4/"
        />
      </div>

      {/* Footer info */}
      <div className="footer-info">
        TEST: Brighton and Co Website – Made by Harry Brighton | Version 0.0.1 / 19/09/2025
      </div>
    </footer>
  );
}
