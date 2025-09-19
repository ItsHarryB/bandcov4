import React from "react";
import Social from "./Social.jsx";
import "../styles/global.css"; // ensure global styles are loaded

export default function Footer() {
  return (
    <footer
      className="site-footer"
      style={{
        padding: "2rem 1rem",
        backgroundColor: "#f8f8f8",
        color: "#333",
        textAlign: "center",
        transition: "background-color 0.5s ease, color 0.5s ease",
      }}
    >
      {/* Sitemap Section */}
      <div
        className="footer-sitemap"
        style={{
          marginBottom: "1rem",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <a href="/">Home</a>
        <a href="/enquiries/">Enquiries</a>
        <a href="/about/">About Me</a>
        <a href="/blog/">Blog</a>
        <a href="/photography/">Photography</a>
        <a href="/links/">Links</a>
      </div>

      {/* Social Icons */}
      <div
        className="footer-social"
        style={{
          marginBottom: "1rem",
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <Social platform="Twitter" username="ItsHarryB" />
        <Social platform="GitHub" username="ItsHarryB_" />
        <Social
          platform="LinkedIn"
          url="https://www.linkedin.com/in/harry-brighton-8a2b971a4/"
        />
      </div>

      {/* Footer Info */}
      <div
        className="footer-info"
        style={{
          fontSize: "0.875rem",
          color: "#666",
          lineHeight: "1.4",
        }}
      >
        TEST: Brighton and Co Website – Made by Harry Brighton | Version 0.0.1 / 19/09/2025
      </div>
    </footer>
  );
}
